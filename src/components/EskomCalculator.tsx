
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
      className="w-full max-w-2xl mx-auto rounded-[32px] p-0.5 border-0 relative shadow-[0_2px_120px_0_rgba(19,60,100,0.42)] overflow-hidden
        ring-2 ring-blue-700/60 before:absolute before:inset-0 before:-z-10 
        before:bg-gradient-to-br before:from-[#0D1321] before:via-[#181929] before:to-[#101212]
        after:content-[''] after:absolute after:inset-0 after:-z-10
        after:bg-[radial-gradient(circle_at_70%_5%,rgba(15,90,183,0.13)_0%,transparent_70%)]
        dark:before:from-[#0d0f18] dark:before:via-[#17192c] dark:before:to-[#0d131a]"
      style={{
        borderRadius: 36,
        boxShadow: "0 8px 32px 0 rgba(10,25,28,0.24), 0 1.5px 12px 0 rgba(0,180,255,0.08)",
        border: '1.5px solid #183b8c'
      }}
    >
      {/* Glow accent ring */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-[36px] z-10 border-2 border-blue-600/60 shadow-[0_0_32px_5px_rgba(77,180,255,0.13)] blur-[2px]" aria-hidden />
      {/* Neon background blur accents */}
      <div className="absolute -top-14 right-[-30px] w-56 h-56 rounded-full bg-gradient-to-tr from-blue-700/40 via-indigo-400/10 to-cyan-300/10 blur-3xl z-0" aria-hidden />
      <div className="absolute left-[-40px] -bottom-14 w-44 h-44 rounded-full bg-gradient-to-br from-green-700/60 via-fuchsia-800/30 to-fuchsia-500/10 blur-2xl z-0" aria-hidden />
      {/* Card content */}
      <CardHeader className="!pb-4 relative z-20 text-white animate-fade-in">
        <div className="flex items-center gap-6">
          <div className="bg-gradient-to-tr from-cyan-600 via-cyan-800 to-indigo-800 p-3.5 rounded-2xl shadow-inner ring-2 ring-cyan-400/30 border-[3px] border-white/5 scale-105">
            <Zap size={36} className="text-cyan-300 drop-shadow" />
          </div>
          <div>
            <CardTitle className="text-4xl font-playfair font-extrabold tracking-tight text-blue-100 leading-tight drop-shadow flex items-center">
              <span className="text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text">EskomCalc&nbsp;Pro</span>
              <span className="ml-2 text-2xl font-black text-primary align-top animate-fade-in">2025/26</span>
            </CardTitle>
            <CardDescription className="mt-2 text-lg text-cyan-100 font-medium drop-shadow">
              Instantly calculate prepaid units. Smart savings, live tariffs.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleFormSubmit} className="space-y-1 z-10 relative">
        <CardContent className="space-y-7 pt-4 pb-2">
          {/* Info section */}
          <div className="mb-2 p-5 rounded-2xl border border-blue-400/15 bg-gradient-to-r from-blue-800/10 via-[#181b23]/70 to-blue-400/10 flex items-center gap-3 shadow-sm backdrop-blur-md">
            <Info className="text-cyan-400 shrink-0" size={22} />
            <div className="text-[16px] text-blue-100 font-semibold">
              Select your <span className="font-bold text-cyan-300">province</span> and <span className="font-bold text-cyan-300">tariff</span>. <span className="text-cyan-200">TOU = Time of Use.</span>
            </div>
            <span className="ml-auto text-xs bg-cyan-500/10 rounded-full px-2.5 py-1 font-bold text-cyan-200 shadow">
              SA Wide
            </span>
          </div>
          {/* Tariff selection and amount input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="space-y-6">
              <TariffSelection
                province={province}
                onProvinceChange={setProvince}
                tariffKey={tariffKey}
                onTariffKeyChange={setTariffKey}
                availableTariffs={availableTariffs}
              />
            </div>
            <div className="space-y-6">
              <AmountInput amount={amount} onAmountChange={setAmount} />
              {showNmdInput && (
                <NmdInput notifiedDemand={notifiedDemand} onNotifiedDemandChange={setNotifiedDemand} />
              )}
            </div>
          </div>
          {/* TOU Controls (Season and sliders) */}
          {showTouControls && selectedTariff && (
            <div className="mt-4 border-t border-blue-300/15 pt-4 bg-gradient-to-r from-blue-900/5 via-slate-900/20 to-transparent rounded-lg shadow-inner">
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
        <CardFooter className="flex flex-col gap-6 bg-gradient-to-r from-[#10121a]/85 via-[#181b23]/60 to-cyan-900/30 !-mx-6 rounded-b-3xl px-8 py-7 mt-2 shadow-md border-t border-cyan-800/30">
          <div className="flex flex-row gap-4 w-full">
            <Button
              type="submit"
              className="w-full text-lg font-bold shadow-lg shadow-cyan-600/10 hover:shadow-cyan-400/20 bg-gradient-to-r from-cyan-900 via-blue-900 to-blue-700 hover:from-cyan-700 hover:to-fuchsia-600 transition-all hover:scale-[1.04]"
              size="lg"
              disabled={!selectedTariff}
            >
              <Calculator className="mr-2 h-5 w-5 text-cyan-200 group-hover:scale-110 transition-transform" /> 
              Calculate Units
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="px-4 ring-2 ring-cyan-800/30 bg-gradient-to-tr from-slate-900/80 via-blue-900/70 to-slate-800/65 hover:scale-105 transition-transform"
              onClick={handleReset}
              title="Reset"
              aria-label="Reset form"
            >
              <RefreshCw size={19} className="text-cyan-400" />
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
