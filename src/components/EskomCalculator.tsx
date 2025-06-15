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

// PROFESSIONAL DARK DESIGN: NO NEON, NO DISTRACTING GRADIENTS. SIMPLY CLEAN & LEGIBLE.
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

  // Clean flash animation for result update
  const [flash, setFlash] = useState(false);
  function handleFormSubmit(e: React.FormEvent) {
    handleCalculate(e);
    setFlash(true);
    setTimeout(() => setFlash(false), 900);
  }
  function handleReset() {
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
      className={`
        w-full max-w-2xl mx-auto 
        bg-[#181E28] dark:bg-[#181E28] 
        border border-slate-800 shadow-xl
        p-0.5 relative overflow-hidden
        rounded-2xl animate-fade-in
      `}
      style={{
        borderRadius: 22,
        boxShadow: "0 2px 20px 2px #161a23bb",
        border: '1.5px solid #282e38'
      }}
    >
      {/* Card Header */}
      <CardHeader className="!pb-3 relative z-20 text-white bg-[#191F2B] rounded-t-2xl border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 p-2.5 rounded-lg text-cyan-400 border border-slate-700 flex items-center">
            <Zap size={25} />
          </div>
          <div>
            <CardTitle className="text-2xl font-playfair font-bold tracking-tight text-white flex items-center">
              EskomCalc Pro
              <span className="ml-2 text-base text-cyan-400 font-extrabold tracking-wide">2025/26</span>
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-slate-100 font-normal">
              {/* Updated text color for better contrast */}
              Calculate prepaid units. Simple. Up-to-date.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleFormSubmit} className="space-y-2 z-10 relative">
        <CardContent className="space-y-5 pt-4 pb-3">
          {/* Info Bar */}
          <div className="mb-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/70 flex items-center gap-3">
            <Info className="text-cyan-400 shrink-0" size={18} />
            <div className="text-[15px] text-slate-50 font-medium">
              Select your <span className="font-bold text-cyan-200">province</span> and <span className="font-bold text-cyan-200">tariff</span>.
              <span className="text-cyan-100/60 ml-2">TOU = Time of Use.</span>
            </div>
          </div>
          {/* Tariff/Amount/NMD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <TariffSelection
                province={province}
                onProvinceChange={setProvince}
                tariffKey={tariffKey}
                onTariffKeyChange={setTariffKey}
                availableTariffs={availableTariffs}
              />
            </div>
            <div className="space-y-4">
              <AmountInput amount={amount} onAmountChange={setAmount} />
              {showNmdInput && (
                <NmdInput notifiedDemand={notifiedDemand} onNotifiedDemandChange={setNotifiedDemand} />
              )}
            </div>
          </div>
          {/* TOU Controls */}
          {showTouControls && selectedTariff && (
            <div className="mt-3 pt-3 border-t border-slate-700">
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
        <CardFooter className="
          flex flex-col gap-5
          bg-[#161A23] dark:bg-[#171B24]
          rounded-b-2xl px-8 py-5 mt-2 border-t border-slate-800
        ">
          <div className="flex flex-row gap-3 w-full">
            <Button
              type="submit"
              className="
                w-full text-lg font-bold shadow 
                bg-cyan-700 hover:bg-cyan-600
                text-white border border-cyan-800/80 
                transition-all hover:scale-[1.02]
              "
              size="lg"
              disabled={!selectedTariff}
            >
              <Calculator className="mr-2 h-5 w-5 text-cyan-200" /> 
              Calculate Units
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="
                px-4
                bg-slate-800 hover:bg-slate-700
                text-cyan-300 border border-slate-700
                transition-transform
              "
              onClick={handleReset}
              title="Reset"
              aria-label="Reset form"
            >
              <RefreshCw size={16} className="text-cyan-300" />
            </Button>
          </div>
          {error && <div className="animate-fade-in"><ErrorAlert error={error} /></div>}
          {result && (
            <div className={flash ? "animate-flash-result" : "transition-all"}>
              <CalculationResultDisplay result={result} amount={amount} />
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
