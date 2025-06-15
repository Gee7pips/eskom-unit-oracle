
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AmountInputProps {
    amount: string;
    onAmountChange: (value: string) => void;
}

export function AmountInput({ amount, onAmountChange }: AmountInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="amount">Amount Spent (R)</Label>
            <Input id="amount" type="number" value={amount} onChange={e => onAmountChange(e.target.value)} placeholder="e.g. 500" required />
        </div>
    );
}
