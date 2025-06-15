
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap } from 'lucide-react';
import { CalculationResult } from '@/lib/calculator';

interface CalculationResultDisplayProps {
    result: CalculationResult;
    amount: string;
}

export function CalculationResultDisplay({ result, amount }: CalculationResultDisplayProps) {
    return (
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
    );
}
