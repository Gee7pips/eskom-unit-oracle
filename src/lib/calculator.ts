import { Tariff } from "@/data/tariffs";

const AVG_DAYS_IN_MONTH = 30.4375;

export interface CalculationInput {
  amount: number;
  tariff: Tariff;
  options: {
    notifiedDemand?: number;
    season?: 'high_demand_season' | 'low_demand_season';
    touPercentages?: {
      peak: number;
      standard: number;
      offPeak: number;
    };
  };
}

export interface CalculationResult {
  units: number;
  breakdown: { label: string; value: string; }[];
}

function calculateFixedCharges(tariff: Tariff, notifiedDemand: number = 0): { totalFixedCharge: number, breakdown: any[] } {
  let totalFixedCharge = tariff.fixed_monthly_charge_R || 0;
  const breakdown = [];

  if (totalFixedCharge > 0) {
    breakdown.push({ label: "Monthly Fixed Charge", value: `R ${totalFixedCharge.toFixed(2)}` });
  }

  // Note: Ruraflex and Megaflex have other charges that are placeholders.
  // A full implementation would require inputs for these.

  return { totalFixedCharge, breakdown };
}


export function calculateUnits({ amount, tariff, options }: CalculationInput): CalculationResult | { error: string } {
  if (amount <= 0) return { error: "Amount must be positive." };

  const notifiedDemand = options.notifiedDemand || 0;
  const { totalFixedCharge, breakdown: fixedChargeBreakdown } = calculateFixedCharges(tariff, notifiedDemand);

  if (amount < totalFixedCharge) {
    return { error: `Amount (R ${amount.toFixed(2)}) is less than the fixed monthly charges (R ${totalFixedCharge.toFixed(2)}).` };
  }

  const amountForEnergy = amount - totalFixedCharge;
  let units = 0;
  let breakdown = [...fixedChargeBreakdown];

  switch (tariff.tariff_type) {
    case 'Inclining Block': {
      const rateBlocks = [...tariff.blocks].sort((a, b) => a.from_kWh - b.from_kWh);
      let remainingAmount = amountForEnergy;
      let totalUnits = 0;
      let lastBlockToKwh = 0;

      for (const block of rateBlocks) {
          if (remainingAmount <= 0) break;

          const rateZAR = block.rate_c_per_kWh / 100;
          
          if (rateZAR > 0) {
              const blockStartKwh = lastBlockToKwh;
              const blockEndKwh = block.to_kWh === null ? Infinity : block.to_kWh;
              const blockkWh = blockEndKwh - blockStartKwh;
              const blockCost = blockkWh * rateZAR;

              if (remainingAmount >= blockCost) {
                  totalUnits += blockkWh;
                  remainingAmount -= blockCost;
              } else {
                  totalUnits += remainingAmount / rateZAR;
                  remainingAmount = 0;
              }
          }
          lastBlockToKwh = block.to_kWh || lastBlockToKwh;
      }
      units = totalUnits;
      breakdown.push({ label: "Energy Cost", value: `R ${amountForEnergy.toFixed(2)}` });
      break;
    }

    case 'Subsidized Flat Rate': {
      const rateZAR = tariff.energy_rate_c_per_kWh / 100;
      if (rateZAR <= 0) return { error: "Invalid rate for this tariff." };
      units = amountForEnergy / rateZAR;
      breakdown.push({ label: "Energy Cost", value: `R ${amountForEnergy.toFixed(2)}` });
      breakdown.push({ label: "Rate", value: `R ${rateZAR.toFixed(4)} / kWh` });
      break;
    }

    case 'Time of Use (TOU)': {
        if (typeof tariff.periods === 'string') {
          return { error: `Calculation for this TOU tariff is not yet supported due to missing rate data.` };
        }
      
        const season = options.season || 'low_demand_season';
        const percentages = options.touPercentages || { peak: 33.3, standard: 33.3, offPeak: 33.4 };
        
        const seasonKeyPart = season === 'high_demand_season' ? 'high_season' : 'low_season';
        
        const peakRate = (tariff.periods as any)[`${seasonKeyPart}_peak`]?.rate_c_per_kWh / 100;
        const stdRate = (tariff.periods as any)[`${seasonKeyPart}_standard`]?.rate_c_per_kWh / 100;
        const offPeakRate = (tariff.periods as any)[`${seasonKeyPart}_off_peak`]?.rate_c_per_kWh / 100;

        if (!peakRate || !stdRate || !offPeakRate) {
            return { error: "Invalid rates for the selected season." };
        }

        const weightedAvgCost = 
            (peakRate * (percentages.peak / 100)) +
            (stdRate * (percentages.standard / 100)) +
            (offPeakRate * (percentages.offPeak / 100));

        if (weightedAvgCost <= 0) return { error: "Invalid weighted rate." };

        units = amountForEnergy / weightedAvgCost;
        breakdown.push({ label: "Energy Cost", value: `R ${amountForEnergy.toFixed(2)}` });
        breakdown.push({ label: "Usage Distribution", value: `Peak: ${percentages.peak}%, Standard: ${percentages.standard}%, Off-Peak: ${percentages.offPeak}%`});
        breakdown.push({ label: `Weighted Avg. Rate (${season === 'high_demand_season' ? 'Winter' : 'Summer'})`, value: `R ${weightedAvgCost.toFixed(4)} / kWh` });
        break;
    }

    default:
      return { error: `Calculation for tariff type "${(tariff as any).tariff_type}" is not yet implemented.` };
  }

  return { units, breakdown };
}
