
import { useEskomCalculator } from '@/hooks/useEskomCalculator';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, RefreshCw, Info } from 'lucide-react';
import { TariffSelection } from './calculator/TariffSelection';
import { AmountInput } from './calculator/AmountInput';
import { NmdInput } from './calculator/NmdInput';
import { TouControls } from './calculator/TouControls';
import { CalculationResultDisplay } from './calculator/CalculationResultDisplay';
import { ErrorAlert } from './calculator/ErrorAlert';
import { useState } from "react";

// REDESIGNED: sleek, glassy card, vertical split, bolder accents, high contrast.
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
    <div className="w-full max-w-lg mx-auto my-10 px-2 md:px-0">
      <Card
        className="
          bg-white/80 dark:bg-[#181E28]/90
          shadow-xl backdrop-blur-xl
          border-0
          rounded-3xl
          px-0 sm:px-0 pt-0 pb-2
          animate-fade-in
          "
        style={{
          boxShadow: "0 4px 32px 0 rgba(8,28,68,0.12), 0 1.5px 9px 0 rgba(0, 230, 255, 0.04)"
        }}
      >
        {/* Header */}
        <div className="
          flex items-center gap-4 pt-7 pb-4 px-7 bg-transparent
          border-b border-slate-200 dark:border-slate-800
          rounded-t-3xl
        ">
          <div className="bg-gradient-to-br from-cyan-300/30 to-cyan-400/60 p-3 rounded-2xl flex items-center border-2 border-cyan-400/20">
            <Zap size={28} className="text-cyan-700 dark:text-cyan-300" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[2rem] font-playfair font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              EskomCalc Pro
              <span className="ml-2 text-base text-cyan-500 font-extrabold tracking-wide">2025/26</span>
            </h2>
            <span className="text-cyan-900/80 dark:text-cyan-100/90 font-medium text-[15px] mt-1">
              Instantly estimate prepaid units, bill, and more.
            </span>
          </div>
        </div>

        {/* Info Bar */}
        <div className="flex items-center gap-3 px-7 pt-4 pb-3">
          <Info className="text-cyan-600 dark:text-cyan-300 shrink-0" size={19} />
          <div className="text-[15px] text-slate-800 dark:text-slate-100 font-medium">
            Select your <span className="font-semibold text-cyan-700 dark:text-cyan-200">province</span> &amp; <span className="font-semibold text-cyan-700 dark:text-cyan-200">tariff</span>&nbsp;
            <span className="text-cyan-900/80 dark:text-cyan-200/50">TOU = Time of Use</span>
          </div>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleFormSubmit}
          className="px-4 sm:px-7 pt-2 pb-1 space-y-0"
        >
          {/* Input Section */}
          <section className="grid gap-y-7">
            <TariffSelection
              province={province}
              onProvinceChange={setProvince}
              tariffKey={tariffKey}
              onTariffKeyChange={setTariffKey}
              availableTariffs={availableTariffs}
            />
            <div className="grid grid-cols-1 gap-y-4">
              <AmountInput amount={amount} onAmountChange={setAmount} />
              {showNmdInput && (
                <NmdInput notifiedDemand={notifiedDemand} onNotifiedDemandChange={setNotifiedDemand} />
              )}
            </div>
            {showTouControls && selectedTariff && (
              <div>
                <TouControls 
                  season={season}
                  onSeasonChange={setSeason}
                  touPercentages={touPercentages}
                  handleTouSliderChange={handleTouSliderChange}
                  selectedTariff={selectedTariff}
                />
              </div>
            )}
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-8">
            <Button
              type="submit"
              className="
                w-full text-lg font-bold 
                bg-cyan-600 hover:bg-cyan-500
                text-white shadow-lg border-none
                rounded-xl py-3 transition
                focus:ring-2 focus:ring-cyan-300
                active:scale-95
              "
              size="lg"
              disabled={!selectedTariff}
            >
              <Calculator className="mr-2 h-6 w-6 text-cyan-100" /> 
              Calculate Units
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="
                w-full sm:w-auto
                flex-shrink-0 justify-center
                bg-gray-200 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800
                text-cyan-800 dark:text-cyan-200
                border border-cyan-200/60 dark:border-slate-700
                shadow
                rounded-xl py-3
                transition
                active:scale-95
              "
              onClick={handleReset}
              title="Reset"
              aria-label="Reset form"
            >
              <RefreshCw size={18} className="text-cyan-500 mr-1" />
              Reset
            </Button>
          </div>

          {/* Error + Result */}
          <div className="mt-6 min-h-[56px]">
            {error && <div className="animate-fade-in"><ErrorAlert error={error} /></div>}
            {result && (
              <div className={flash ? "animate-flash-result" : "transition-all"}>
                <CalculationResultDisplay result={result} amount={amount} />
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
