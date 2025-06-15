
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap } from 'lucide-react';
import { CalculationResult } from '@/lib/calculator';

interface CalculationResultDisplayProps {
    result: CalculationResult;
    amount: string;
}

export function CalculationResultDisplay({ result, amount }: CalculationResultDisplayProps) {
    return (
        <Alert
            className="w-full text-left animate-fade-in duration-700 px-7 py-5 border-0 bg-gradient-to-r from-green-50/60 via-white/80 to-blue-50/50 dark:from-blue-900/60 dark:via-slate-900/80 dark:to-green-900/40 shadow-lg rounded-xl transition-all"
            style={{
                boxShadow: "0 2px 24px 0 rgba(30,150,90,0.08),0 1.5px 6px 0 rgba(40,80,255,0.03)",
            }}
            aria-live="polite"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 pb-1">
                    <Zap className="h-6 w-6 text-primary drop-shadow" />
                    <AlertTitle className="text-2xl font-extrabold font-playfair tracking-tight text-primary mb-0">
                        Result
                    </AlertTitle>
                </div>
                <span
                  className="inline-block bg-gradient-to-tr from-green-200 via-blue-100 to-blue-300/30 dark:from-primary/20 dark:to-muted/10
                    text-primary rounded-lg px-4 py-1.5 shadow font-extrabold font-playfair text-3xl tracking-tight ring-1 ring-primary/10
                    animate-flash-result"
                >
                    {result.units.toFixed(2)} <span className="text-base font-sans font-semibold">kWh</span>
                </span>
            </div>
            <AlertDescription className="text-base font-medium">
                <span className="block text-muted-foreground pb-1">For <span className="font-bold text-foreground">R{parseFloat(amount).toFixed(2)}</span>, you will get approximately:</span>
                <ul className="list-disc list-inside mt-2 text-[15px] text-muted-foreground/90 space-y-1">
                    {result.breakdown.map((item, i) => (
                        <li key={i}>
                            <span className="font-semibold text-foreground">{item.label}:</span> {item.value}
                        </li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
