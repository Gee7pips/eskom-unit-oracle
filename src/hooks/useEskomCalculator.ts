
import { useState, useMemo, useEffect } from 'react';
import { tariffs, Tariff, TOUTariff } from '@/data/tariffs';
import { provinceTariffs } from '@/data/provinces';
import { calculateUnits, CalculationResult } from '@/lib/calculator';

export function useEskomCalculator() {
  const [province, setProvince] = useState<string>(Object.keys(provinceTariffs)[0]);
  const [tariffKey, setTariffKey] = useState<string>('');
  const [amount, setAmount] = useState<string>('500');
  const [notifiedDemand, setNotifiedDemand] = useState<string>('25');
  const [season, setSeason] = useState<'high_demand_season' | 'low_demand_season'>('low_demand_season');
  const [touPercentages, setTouPercentages] = useState({ peak: 20, standard: 50, offPeak: 30 });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // SAFER: If province isn't found, default to empty array.
  const availableTariffs = useMemo(() => {
    if (!province) return [];
    return (provinceTariffs[province] ?? []).filter(t => t.tariffKey && tariffs[t.tariffKey]);
  }, [province]);

  useEffect(() => {
    if (availableTariffs.length > 0) {
      if (!availableTariffs.find(t => t.tariffKey === tariffKey)) {
        setTariffKey(String(availableTariffs[0].tariffKey!));
      }
    } else {
      setTariffKey('');
    }
    setResult(null);
    setError(null);
  }, [availableTariffs, province, tariffKey]);
  
  const selectedTariff = useMemo(() => (tariffKey ? tariffs[tariffKey] : null), [tariffKey]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTariff) return;
    setError(null);
    setResult(null);

    const calcResult = calculateUnits({
      amount: parseFloat(amount),
      tariff: selectedTariff,
      options: {
        notifiedDemand: parseFloat(notifiedDemand),
        season: season,
        touPercentages: touPercentages,
      },
    });

    if ('error' in calcResult) {
      setError(calcResult.error);
    } else {
      setResult(calcResult);
    }
  };

  const handleTouSliderChange = (type: 'peak' | 'standard', value: number) => {
    const newPercentages = { ...touPercentages };
    let remaining = 100 - value;

    if (type === 'peak') {
        newPercentages.peak = value;
        const totalStandardAndOffPeak = newPercentages.standard + newPercentages.offPeak;
        if (totalStandardAndOffPeak > 0) {
            const standardRatio = newPercentages.standard / totalStandardAndOffPeak;
            newPercentages.standard = Math.round(remaining * standardRatio);
        } else {
            newPercentages.standard = Math.round(remaining / 2);
        }
        newPercentages.offPeak = 100 - newPercentages.peak - newPercentages.standard;
    } else { // standard
        newPercentages.standard = value;
        if ((newPercentages.peak + newPercentages.standard) > 100) {
            newPercentages.peak = 100 - newPercentages.standard;
        }
        newPercentages.offPeak = 100 - newPercentages.peak - newPercentages.standard;
    }
    
    setTouPercentages(newPercentages);
  };
  
  const showNmdInput = selectedTariff && ('network_capacity_charge_R_per_kVA' in selectedTariff);
  const showTouControls = selectedTariff && selectedTariff.tariff_type === 'Time of Use (TOU)';

  return {
    province,
    setProvince,
    tariffKey,
    setTariffKey,
    amount,
    setAmount,
    notifiedDemand,
    setNotifiedDemand,
    season,
    setSeason,
    touPercentages,
    setTouPercentages,
    handleTouSliderChange,
    result,
    error,
    availableTariffs,
    selectedTariff,
    handleCalculate,
    showNmdInput,
    showTouControls
  };
}
