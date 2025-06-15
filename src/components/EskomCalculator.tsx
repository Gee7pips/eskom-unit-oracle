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
    setTouPercentages,
    handleTouSliderChange,
    result,
    error,
    availableTariffs,
    selectedTariff,
    handleCalculate,
    showNmdInput,
    showTouControls,
    provinceTariffs
  } = useEskomCalculator();

  // Animation: show flash on new result
  const [flash, setFlash] = useState(false);
  function handleFormSubmit(e: React.FormEvent) {
    handleCalculate(e);
    setFlash(true);
    setTimeout(() => setFlash(false), 1000);
  }
  function handleReset() {
    // Always reset to a valid province key (first available in provinceTariffs)
    const firstProvinceKey = Object.keys(provinceTariffs)[0] ?? "Gauteng";
    setProvince(firstProvinceKey);
    setTariffKey('');
    setAmount('500');
    setNotifiedDemand('25');
    setSeason('low_demand_season');
    setTouPercentages({ peak: 20, standard: 50, offPeak: 30 });
  }

  return (
    <Card
      className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-[#f7fafc] via-white to-[#e4eafe] dark:from-[#16192a] dark:via-[#23263a] dark:to-[#22253b] 
        backdrop-blur-[2px] rounded-2xl px-1 py-1 ring-1 ring-primary/10"
      style={{
        // Soft glass effect in light, deep gradient in dark
        boxShadow: "0 4px 28px 0 rgba(0,30,150,0.08),0 1.5px 6px 0 rgba(90,140,255,0.04)",
      }}
    >
      <CardHeader className="!pb-4">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-tr from-green-300 via-blue-200 to-indigo-300 p-3 rounded-xl shadow-inner ring-2 ring-primary/20">
            <Zap size={30} className="text-primary drop-shadow" />
          </div>
          <div>
            <CardTitle className="text-3xl font-playfair font-extrabold tracking-tight text-primary animate-fade-in duration-700 leading-tight drop-shadow-sm">
              Eskom Unit Calculator
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground font-medium mt-1">
              Calculate your electricity units for 2025/26 tariffs.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleFormSubmit} className="space-y-1">
        <CardContent className="space-y-9 pt-2">
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
        <CardFooter className="flex flex-col gap-5 bg-gradient-to-r from-primary/5 via-transparent to-indigo-200/25 dark:from-primary/10 dark:via-transparent dark:to-indigo-900/10 !-mx-6 rounded-b-2xl px-6 py-4 mt-3">
          <div className="flex flex-row gap-3 w-full">
            <Button
              type="submit"
              className="w-full text-lg font-bold shadow-lg shadow-primary/10 transition-transform duration-100 hover:scale-105 hover:shadow-xl active:scale-[0.98] focus:ring-2 focus:ring-primary/70"
              size="lg"
              disabled={!selectedTariff}
            >
              <Calculator className="mr-2 h-5 w-5" /> Calculate Units
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="px-4 ring-1 ring-secondary/30 bg-gradient-to-tr from-muted via-white to-muted/80 dark:from-muted/30 dark:to-muted/60"
              onClick={handleReset}
              title="Reset"
              aria-label="Reset form"
            >
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
