import { useState, useMemo, useEffect } from 'react';
import { tariffs, Tariff } from '@/data/tariffs';
import { provinceTariffs } from '@/data/provinces';
import { calculateUnits, CalculationResult } from '@/lib/calculator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Calculator, Info, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TOUTariff } from '@/data/tariffs';

export function EskomCalculator() {
  const [province, setProvince] = useState<string>(Object.keys(provinceTariffs)[0]);
  const [tariffKey, setTariffKey] = useState<string>('');
  const [amount, setAmount] = useState<string>('500');
  const [notifiedDemand, setNotifiedDemand] = useState<string>('25');
  const [season, setSeason] = useState<'high_demand_season' | 'low_demand_season'>('low_demand_season');
  const [touPercentages, setTouPercentages] = useState({ peak: 20, standard: 50, offPeak: 30 });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const availableTariffs = useMemo(() => {
    if (!province) return [];
    return provinceTariffs[province].filter(t => t.tariffKey && tariffs[t.tariffKey]);
  }, [province]);

  useEffect(() => {
    if (availableTariffs.length > 0) {
      if (!availableTariffs.find(t => String(t.tariffKey) === tariffKey)) {
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
        const standardRatio = newPercentages.standard / (newPercentages.standard + newPercentages.offPeak);
        newPercentages.standard = Math.round(remaining * standardRatio);
        newPercentages.offPeak = 100 - newPercentages.peak - newPercentages.standard;
    } else { // standard
        newPercentages.standard = value;
        if ((newPercentages.peak + newPercentages.standard) > 100) {
            newPercentages.peak = 100 - newPercentages.standard;
        }
        newPercentages.offPeak = 100 - newPercentages.peak - newPercentages.standard;
    }
    
    setTouPercentages(newPercentages);
  }

  const showNmdInput = selectedTariff && ('network_capacity_charge_R_per_kVA' in selectedTariff);
  const showTouControls = selectedTariff && selectedTariff.tariff_type === 'Time of Use (TOU)';

  const touTooltips = useMemo(() => {
    if (!showTouControls || !selectedTariff || typeof (selectedTariff as TOUTariff).periods !== 'object') {
      return { peak: '', standard: '', offPeak: '' };
    }
    const periods = (selectedTariff as TOUTariff).periods as any;
    const seasonKeyPart = season === 'high_demand_season' ? 'high_season' : 'low_season';
    
    return {
      peak: periods[`${seasonKeyPart}_peak`]?.hours ? `Hours: ${periods[`${seasonKeyPart}_peak`]?.hours}` : 'Peak usage hours',
      standard: 'Standard usage hours',
      offPeak: 'Off-peak usage hours (usually nighttime)',
    }
  }, [selectedTariff, showTouControls, season]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg">
            <Zap size={28} />
          </div>
          <div>
            <CardTitle className="text-2xl">Eskom Unit Calculator</CardTitle>
            <CardDescription>Calculate your electricity units based on the 2025/26 tariffs.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleCalculate}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">Select Province</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger id="province">
                  <SelectValue placeholder="Select a province" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(provinceTariffs).map((prov) => (
                    <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tariff">Select Tariff Plan</Label>
              <Select value={tariffKey} onValueChange={setTariffKey} disabled={!province || availableTariffs.length === 0}>
                <SelectTrigger id="tariff">
                  <SelectValue placeholder="Select a tariff" />
                </SelectTrigger>
                <SelectContent>
                  {availableTariffs.map((t) => (
                    <SelectItem key={String(t.tariffKey)} value={String(t.tariffKey!)}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {availableTariffs.length === 0 && province && (
                <p className="text-xs text-muted-foreground pt-1">No supported tariffs for this province yet.</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount Spent (R)</Label>
            <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 500" required />
          </div>
          
          {showNmdInput && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="nmd">Notified Maximum Demand (kVA)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={16} className="cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your contracted capacity with Eskom. Found on your bill.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="nmd" type="number" value={notifiedDemand} onChange={e => setNotifiedDemand(e.target.value)} placeholder="e.g. 25" required />
            </div>
          )}

          {showTouControls && selectedTariff && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Time of Use Settings</h3>
                <Select value={season} onValueChange={(v) => setSeason(v as any)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low_demand_season">Summer</SelectItem>
                        <SelectItem value="high_demand_season">Winter</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Peak ({touPercentages.peak}%)</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild><Info size={16} className="cursor-pointer text-muted-foreground" /></TooltipTrigger>
                            <TooltipContent><p>{touTooltips.peak}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Slider value={[touPercentages.peak]} onValueChange={([v]) => handleTouSliderChange('peak', v)} max={100} step={1} />
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between">
                    <Label>Standard ({touPercentages.standard}%)</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild><Info size={16} className="cursor-pointer text-muted-foreground" /></TooltipTrigger>
                            <TooltipContent><p>{touTooltips.standard}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Slider value={[touPercentages.standard]} onValueChange={([v]) => handleTouSliderChange('standard', v)} max={100 - touPercentages.peak} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Off-Peak ({touPercentages.offPeak}%)</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild><Info size={16} className="cursor-pointer text-muted-foreground" /></TooltipTrigger>
                            <TooltipContent><p>{touTooltips.offPeak}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="bg-muted rounded-md h-10 flex items-center justify-center font-medium">
                  {touPercentages.offPeak}%
                </div>
              </div>
            </div>
          )}

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full text-lg" size="lg" disabled={!selectedTariff}>
            <Calculator className="mr-2 h-5 w-5" /> Calculate Units
          </Button>

          {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          
          {result && (
            <Alert className="w-full text-left">
              <Zap className="h-4 w-4" />
              <AlertTitle className="text-xl">Calculation Result</AlertTitle>
              <AlertDescription>
                For <span className="font-bold">R{parseFloat(amount).toFixed(2)}</span>, you will get approximately:
                <div className="text-4xl font-bold text-primary my-4 text-center">
                  {result.units.toFixed(2)} kWh
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t">
                  <h4 className="font-semibold">Cost Breakdown:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {result.breakdown.map((item, i) => (
                      <li key={i}>
                        <span className="font-medium text-foreground">{item.label}:</span> {item.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

        </CardFooter>
      </form>
    </Card>
  );
}
