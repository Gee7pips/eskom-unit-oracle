
import { useEskomCalculator } from '@/hooks/useEskomCalculator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, RefreshCw, Info } from 'lucide-react';
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
      // Force a custom, rich dark mode regardless of page theme
      className="w-full max-w-2xl mx-auto shadow-2xl border-0 rounded-3xl px-0.5 py-1 ring-1 ring-primary/10 animate-fade-in duration-500 relative
        !bg-gradient-to-br !from-[#181b23] !via-[#242940] !to-[#121319] dark:!from-[#121419] dark:!via-[#23253E] dark:!to-[#0b101a]"
      style={{
        boxShadow: "0 10px 50px 0 rgba(24,36,64,0.25), 0 2.5px 12px 0 rgba(25,155,255,0.07)",
        border: '1.5px solid #202745'
      }}
    >
      {/* Decorative background accent circle (subtle, behind) */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-900/40 blur-2xl z-0" aria-hidden />
      <div className="absolute left-[-30px] bottom-[-18px] w-32 h-32 rounded-full bg-green-900/50 blur-3xl z-0" aria-hidden />
      {/* ------------- */}
      <CardHeader className="!pb-4 relative z-10 text-white">
        <div className="flex items-center gap-6">
          <div className="bg-gradient-to-tr from-green-600 via-blue-800 to-indigo-800 p-3 rounded-2xl shadow-inner ring-2 ring-primary/20 border-[3px] border-white/5">
            <Zap size={32} className="text-green-300 drop-shadow" />
          </div>
          <div>
            <CardTitle className="text-4xl font-playfair font-extrabold tracking-tight text-green-100 animate-fade-in duration-700 leading-tight drop-shadow-sm flex items-center">
              EskomCalc Pro&nbsp;
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-2xl font-bold ml-1 align-top">2025/26</span>
            </CardTitle>
            <CardDescription className="text-md text-blue-200 font-medium mt-1">
              Instantly calculate your prepaid units. Choose your best tariff, maximize savings.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleFormSubmit} className="space-y-1 z-10 relative">
        <CardContent className="space-y-9 pt-3 pb-1">
          <div className="mb-2 p-4 rounded-2xl border border-blue-900/30 bg-gradient-to-r from-blue-900/30 via-[#181b23]/70 to-green-800/30 flex items-center gap-3 animate-scale-in">
            <Info className="text-blue-400 shrink-0" size={20} />
            <div className="text-[15px] text-blue-100 font-medium">
              Select your <span className="font-semibold text-green-300">province</span> and <span className="font-semibold text-green-300">tariff</span> below. TOU = Time of Use tariffs.
            </div>
            <span className="ml-auto text-xs bg-blue-950/40 rounded-full px-2.5 py-1 font-bold text-blue-300 uppercase shadow">
              SA Wide
            </span>
          </div>
          {/* Tariff selection and amount input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-7 animate-fade-in">
              <TariffSelection
                province={province}
                onProvinceChange={setProvince}
                tariffKey={tariffKey}
                onTariffKeyChange={setTariffKey}
                availableTariffs={availableTariffs}
              />
            </div>
            <div className="space-y-7 animate-fade-in">
              <AmountInput amount={amount} onAmountChange={setAmount} />
              {showNmdInput && (
                <NmdInput notifiedDemand={notifiedDemand} onNotifiedDemandChange={setNotifiedDemand} />
              )}
            </div>
          </div>
          {/* TOU Controls (Season and sliders) */}
          {showTouControls && selectedTariff && (
            <div className="mt-5 border-t border-primary/20 pt-4">
              <TouControls 
                season={season}
                onSeasonChange={setSeason}
                touPercentages={touPercentages}
                handleTouSliderChange={handleTouSliderChange}
                selectedTariff={selectedTariff}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-6 bg-gradient-to-r from-[#13151d]/60 via-[#181b23]/50 to-blue-950/30 !-mx-6 rounded-b-3xl px-8 py-7 mt-3 shadow-md">
          <div className="flex flex-row gap-4 w-full">
            <Button
              type="submit"
              className="w-full text-lg font-bold shadow-lg shadow-blue-600/10 transition-transform duration-100 hover:scale-105 hover:shadow-xl group bg-gradient-to-r from-green-800 via-blue-900 to-blue-700 hover:from-green-700 hover:to-blue-800"
              size="lg"
              disabled={!selectedTariff}
            >
              <Calculator className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              Calculate Units
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="px-4 ring-2 ring-blue-800/30 bg-gradient-to-tr from-slate-900/80 via-blue-900/60 to-slate-800/70 hover:scale-105 transition-transform"
              onClick={handleReset}
              title="Reset"
              aria-label="Reset form"
            >
              <RefreshCw size={19} className="text-blue-400" />
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
