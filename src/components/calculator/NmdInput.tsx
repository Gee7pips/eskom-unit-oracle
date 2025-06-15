
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface NmdInputProps {
    notifiedDemand: string;
    onNotifiedDemandChange: (value: string) => void;
}

export function NmdInput({ notifiedDemand, onNotifiedDemandChange }: NmdInputProps) {
    return (
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
            <Input id="nmd" type="number" value={notifiedDemand} onChange={e => onNotifiedDemandChange(e.target.value)} placeholder="e.g. 25" required />
        </div>
    );
}
