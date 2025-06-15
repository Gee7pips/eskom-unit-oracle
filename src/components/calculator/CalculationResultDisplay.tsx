
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap } from 'lucide-react';
import { CalculationResult } from '@/lib/calculator';

interface CalculationResultDisplayProps {
    result: CalculationResult;
    amount: string;
}

export function CalculationResultDisplay({ result, amount }: CalculationResultDisplayProps) {
    return (
        <Alert className="w-full text-left animate-fade-in duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 pb-1">
                    <Zap className="h-5 w-5 text-primary" />
                    <AlertTitle className="text-xl font-bold font-playfair tracking-tight text-primary">Result</AlertTitle>
                </div>
                <span className="inline-block bg-primary/10 text-primary rounded px-2 py-0.5 font-bold font-playfair text-2xl tracking-tight shadow-sm animate-flash-result">
                    {result.units.toFixed(2)} <span className="text-base font-sans">kWh</span>
                </span>
            </div>
            <AlertDescription>
                <span className="block text-muted-foreground pb-1">For <span className="font-bold text-foreground">R{parseFloat(amount).toFixed(2)}</span>, you will get approximately:</span>
                <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                    {result.breakdown.map((item, i) => (
                        <li key={i}>
                            <span className="font-medium text-foreground">{item.label}:</span> {item.value}
                        </li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
