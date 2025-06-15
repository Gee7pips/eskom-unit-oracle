
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

// MODERN, LUX DARK DESIGN
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
        bg-gradient-to-tr from-[#0b1227] via-[#131B2D] to-[#19233d]
        dark:bg-gradient-to-tr dark:from-[#10162b] dark:via-[#152147] dark:to-[#12263a]
        rounded-[30px] border border-blue-900/60 shadow-xl shadow-blue-900/30
        p-0.5 relative overflow-hidden
        animate-fade-in
      `}
      style={{
        borderRadius: 30,
        boxShadow: "0 4px 36px 0 rgba(15,33,55,0.29), 0 1.5px 12px 0 rgba(88,199,250,0.04)",
        border: '1.5px solid #20315e'
      }}
    >
      {/* Neon Top edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 -top-2 h-3 rounded-t-[32px] z-20 blur-[3.5px] opacity-70" style={{
        background: "linear-gradient(90deg,#31f2f8 0%,#589dff 45%,#00fff0 100%)"
      }} />
      {/* Subtle radial background */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 10% 30%,rgba(33,160,255,0.15) 0,rgba(22,27,47,0.0) 60%)"
        }} />
      {/* Card content */}
      <CardHeader className="!pb-3 relative z-20 text-white">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-tr from-cyan-600 via-blue-700/60 to-indigo-800 p-3 rounded-xl shadow-inner border border-white/10 text-cyan-300">
            <Zap size={28} className="drop-shadow" />
          </div>
          <div>
            <CardTitle className="text-3xl font-playfair font-extrabold tracking-tight text-blue-100 leading-tight flex items-center">
              <span className="text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 bg-clip-text">
                EskomCalc Pro
              </span>
              <span className="ml-2 text-lg font-black text-cyan-300 align-top">
                2025/26
              </span>
            </CardTitle>
            <CardDescription className="mt-1 text-base text-cyan-100 font-normal drop-shadow-sm">
              Calculate prepaid units. Live tariffs, simple savings.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleFormSubmit} className="space-y-1 z-10 relative">
        <CardContent className="space-y-6 pt-3 pb-2">
          {/* Info section */}
          <div className="mb-2 p-4 rounded-xl border border-blue-400/25 bg-gradient-to-r from-blue-800/30 via-[#141F37]/80 to-blue-600/10 flex items-center gap-3 shadow-sm">
            <Info className="text-cyan-300 shrink-0" size={19} />
            <div className="text-[15px] text-blue-200/90 font-semibold">
              Select your <span className="font-bold text-cyan-200">province</span> and <span className="font-bold text-cyan-200">tariff</span>. <span className="text-cyan-100/70">TOU = Time of Use.</span>
            </div>
            <span className="ml-auto text-xs bg-cyan-400/10 rounded-full px-2 py-1 font-bold text-cyan-100 ring-1 ring-cyan-500/20 animate-fade-in">SA Wide</span>
          </div>
          {/* Tariff selection and amount input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {/* TOU Controls */}
          {showTouControls && selectedTariff && (
            <div className="mt-3 border-t border-blue-300/20 pt-4 bg-gradient-to-r from-blue-900/30 via-slate-950/40 to-transparent rounded-lg shadow-sm">
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
          bg-gradient-to-br from-[#182649]/60 via-[#10182b]/75 to-[#28448d]/40
          dark:from-[#162046]/60 dark:via-[#131f36]/80 dark:to-[#15325a]/20
          !-mx-6 rounded-b-[27px] px-8 py-6 mt-2 shadow-lg border-t border-blue-900/30
        ">
          <div className="flex flex-row gap-3 w-full">
            <Button
              type="submit"
              className="
                w-full text-lg font-bold shadow-lg shadow-cyan-400/10 
                hover:shadow-cyan-300/20 transition-all hover:scale-[1.03]
                bg-gradient-to-tr from-blue-800 via-blue-600 to-cyan-600
                text-cyan-100
                border-2 border-cyan-800/10
                hover:bg-gradient-to-tr hover:from-cyan-700 hover:to-fuchsia-600
              "
              size="lg"
              disabled={!selectedTariff}
            >
              <Calculator className="mr-2 h-5 w-5 text-cyan-200 group-hover:scale-110 transition-transform" /> 
              Calculate Units
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="
                px-4 ring-1 ring-cyan-300/15
                bg-gradient-to-tr from-slate-800 via-blue-800/90 to-slate-900/90
                hover:scale-105 transition-transform
                text-cyan-200
                border border-blue-800/10
              "
              onClick={handleReset}
              title="Reset"
              aria-label="Reset form"
            >
              <RefreshCw size={17} className="text-cyan-300" />
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
