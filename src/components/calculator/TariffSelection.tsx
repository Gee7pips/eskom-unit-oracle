
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { provinceTariffs, ProvinceTariffInfo } from '@/data/provinces';

interface TariffSelectionProps {
    province: string;
    onProvinceChange: (value: string) => void;
    tariffKey: string;
    onTariffKeyChange: (value: string) => void;
    availableTariffs: ProvinceTariffInfo[];
}

export function TariffSelection({ province, onProvinceChange, tariffKey, onTariffKeyChange, availableTariffs }: TariffSelectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="province">Select Province</Label>
                <Select value={province} onValueChange={onProvinceChange}>
                    <SelectTrigger id="province">
                        <SelectValue placeholder="Select a province" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(provinceTariffs).map((prov) => (
                            <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="tariff">Select Tariff Plan</Label>
                <Select value={tariffKey} onValueChange={onTariffKeyChange} disabled={!province || availableTariffs.length === 0}>
                    <SelectTrigger id="tariff">
                        <SelectValue placeholder="Select a tariff" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableTariffs.map((t) => (
                            <SelectItem key={String(t.tariffKey)} value={String(t.tariffKey!)}>{t.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {availableTariffs.length === 0 && province && (
                    <p className="text-xs text-muted-foreground pt-1">No supported tariffs for this province yet.</p>
                )}
            </div>
        </div>
    );
}
