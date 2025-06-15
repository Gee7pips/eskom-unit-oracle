
import { useState, useMemo } from 'react';
import { tariffs, Tariff } from '@/data/tariffs';
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

export function EskomCalculator() {
  const [tariffKey, setTariffKey] = useState<string>(Object.keys(tariffs)[0]);
  const [amount, setAmount] = useState<string>('500');
  const [notifiedDemand, setNotifiedDemand] = useState<string>('25');
  const [season, setSeason] = useState<'high_demand_season' | 'low_demand_season'>('low_demand_season');
  const [touPercentages, setTouPercentages] = useState({ peak: 20, standard: 50, offPeak: 30 });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const selectedTariff = useMemo(() => tariffs[tariffKey], [tariffKey]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
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

  const showNmdInput = selectedTariff.tariff_type.includes('Unbundled') || selectedTariff.tariff_type.includes('Time-of-Use');
  const showTouControls = selectedTariff.tariff_type === 'Time-of-Use';

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
              <Label htmlFor="tariff">Select Tariff Plan</Label>
              <Select value={tariffKey} onValueChange={setTariffKey}>
                <SelectTrigger id="tariff">
                  <SelectValue placeholder="Select a tariff" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tariffs).map(([key, t]) => (
                    <SelectItem key={key} value={key}>{t.description}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount Spent (R)</Label>
              <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 500" required />
            </div>
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

          {showTouControls && (
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
                            <TooltipContent><p>{selectedTariff.time_of_use_periods?.peak_hours_low_season}</p></TooltipContent>
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
                            <TooltipContent><p>{selectedTariff.time_of_use_periods?.standard_hours}</p></TooltipContent>
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
                            <TooltipContent><p>{selectedTariff.time_of_use_periods?.off_peak_hours}</p></TooltipContent>
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
          <Button type="submit" className="w-full text-lg" size="lg">
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
