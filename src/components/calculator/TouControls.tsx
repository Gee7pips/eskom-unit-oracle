
import { useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { Tariff, TOUTariff } from '@/data/tariffs';

interface TouControlsProps {
    season: 'high_demand_season' | 'low_demand_season';
    onSeasonChange: (value: 'high_demand_season' | 'low_demand_season') => void;
    touPercentages: { peak: number; standard: number; offPeak: number; };
    handleTouSliderChange: (type: 'peak' | 'standard', value: number) => void;
    selectedTariff: Tariff | null;
}

export function TouControls({ season, onSeasonChange, touPercentages, handleTouSliderChange, selectedTariff }: TouControlsProps) {

    const touTooltips = useMemo(() => {
        if (!selectedTariff || typeof (selectedTariff as TOUTariff).periods !== 'object') {
            return { peak: '', standard: '', offPeak: '' };
        }
        const periods = (selectedTariff as TOUTariff).periods as any;
        const seasonKeyPart = season === 'high_demand_season' ? 'high_season' : 'low_season';

        return {
            peak: periods[`${seasonKeyPart}_peak`]?.hours ? `Hours: ${periods[`${seasonKeyPart}_peak`]?.hours}` : 'Peak usage hours',
            standard: 'Standard usage hours',
            offPeak: 'Off-peak usage hours (usually nighttime)',
        }
    }, [selectedTariff, season]);


    return (
        <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">Time of Use Settings</h3>
                <Select value={season} onValueChange={(v) => onSeasonChange(v as any)}>
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
                            <TooltipContent><p>{touTooltips.peak}</p></TooltipContent>
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
                            <TooltipContent><p>{touTooltips.standard}</p></TooltipContent>
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
                            <TooltipContent><p>{touTooltips.offPeak}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="bg-muted rounded-md h-10 flex items-center justify-center font-medium">
                  {touPercentages.offPeak}%
                </div>
              </div>
        </div>
    );
}
