
import { useEskomCalculator } from '@/hooks/useEskomCalculator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Zap } from 'lucide-react';
import { TariffSelection } from './calculator/TariffSelection';
import { AmountInput } from './calculator/AmountInput';
import { NmdInput } from './calculator/NmdInput';
import { TouControls } from './calculator/TouControls';
import { CalculationResultDisplay } from './calculator/CalculationResultDisplay';
import { ErrorAlert } from './calculator/ErrorAlert';

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
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full text-lg" size="lg" disabled={!selectedTariff}>
            <Calculator className="mr-2 h-5 w-5" /> Calculate Units
          </Button>

          {error && <ErrorAlert error={error} />}
          
          {result && <CalculationResultDisplay result={result} amount={amount} />}

        </CardFooter>
      </form>
    </Card>
  );
}
