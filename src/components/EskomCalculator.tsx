
import { useEskomCalculator } from '@/hooks/useEskomCalculator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, RefreshCw } from 'lucide-react';
import { TariffSelection } from './calculator/TariffSelection';
import { AmountInput } from './calculator/AmountInput';
import { NmdInput } from './calculator/NmdInput';
import { TouControls } from './calculator/TouControls';
import { CalculationResultDisplay } from './calculator/CalculationResultDisplay';
import { ErrorAlert } from './calculator/ErrorAlert';
import { useState } from "react";

export function EskomCalculator() {
  const {
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
    handleTouSliderChange,
    result,
    error,
    availableTariffs,
    selectedTariff,
    handleCalculate,
    showNmdInput,
    showTouControls
  } = useEskomCalculator();

  // Animation: show flash on new result
  const [flash, setFlash] = useState(false);
  function handleFormSubmit(e: React.FormEvent) {
    handleCalculate(e);
    setFlash(true);
    setTimeout(() => setFlash(false), 1000);
  }
  function handleReset() {
    setProvince(Object.keys(availableTariffs?.length ? availableTariffs[0] : {})[0] ?? "Gauteng");
    setTariffKey('');
    setAmount('500');
    setNotifiedDemand('25');
    setSeason('low_demand_season');
    setTouPercentages({ peak: 20, standard: 50, offPeak: 30 });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl transition-shadow duration-500 hover:shadow-[0_10px_36px_rgba(16,83,194,0.1)] bg-card/90 backdrop-blur">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-green-300 via-blue-200 to-primary p-3 rounded-lg shadow ring-2 ring-primary/25">
            <Zap size={28} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-playfair font-bold tracking-tight text-primary animate-fade-in duration-700">Eskom Unit Calculator</CardTitle>
            <CardDescription className="text-md text-muted-foreground">Calculate your electricity units for 2025/26 tariffs.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleFormSubmit} className="space-y-1">
        <CardContent className="space-y-8 pt-2">
          <TariffSelection
            province={province}
            onProvinceChange={setProvince}
            tariffKey={tariffKey}
            onTariffKeyChange={setTariffKey}
            availableTariffs={availableTariffs}
          />
          <AmountInput amount={amount} onAmountChange={setAmount} />
          
          {showNmdInput && (
            <NmdInput notifiedDemand={notifiedDemand} onNotifiedDemandChange={setNotifiedDemand} />
          )}

          {showTouControls && selectedTariff && (
            <TouControls 
              season={season}
              onSeasonChange={setSeason}
              touPercentages={touPercentages}
              handleTouSliderChange={handleTouSliderChange}
              selectedTariff={selectedTariff}
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 w-full">
            <Button type="submit" className="w-full text-lg shadow transition-transform duration-100 hover:scale-105" size="lg" disabled={!selectedTariff}>
              <Calculator className="mr-2 h-5 w-5" /> Calculate Units
            </Button>
            <Button type="button" variant="secondary" className="px-4" onClick={handleReset} title="Reset">
              <RefreshCw size={18} />
            </Button>
          </div>
          {error && <div className="animate-fade-in"><ErrorAlert error={error} /></div>}
          {result && (
            <div className={flash ? "animate-flash-result" : ""}>
              <CalculationResultDisplay result={result} amount={amount} />
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
