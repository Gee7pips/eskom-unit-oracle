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

function calculateMegaflex(input: CalculationInput): CalculationResult | { error: string } {
  const { amount } = input;
  const tariff = input.tariff as any;
  // Calculate a typical monthly basis (assuming 30.44 days)
  const days = 30.4375;
  const service = tariff.service_charge_R_per_POD_day * days;
  const network = tariff.network_capacity_charge_R_per_POD_day * days;
  const generation = tariff.generation_capacity_charge_R_per_POD_day * days;
  const fixed = service + network + generation;

  if (amount < fixed) {
    return { error: `Amount (R ${amount.toFixed(2)}) is less than the fixed monthly charges (R ${fixed.toFixed(2)}).` };
  }
  const amountForEnergy = amount - fixed;
  // Effective avg energy rate (combine variable charges)
  const totalEnergyRate = tariff.energy_rate_c_per_kWh + tariff.network_demand_charge_c_per_kWh + tariff.ancillary_service_charge_c_per_kWh;
  const rateZAR = totalEnergyRate / 100;
  const units = amountForEnergy / rateZAR;

  const breakdown = [
    { label: "Service Charge", value: `R ${service.toFixed(2)}` },
    { label: "Network Capacity Charge", value: `R ${network.toFixed(2)}` },
    { label: "Generation Capacity Charge", value: `R ${generation.toFixed(2)}` },
    { label: "Energy Used", value: `R ${amountForEnergy.toFixed(2)}` },
    { label: "Total Energy Rate", value: `R ${rateZAR.toFixed(4)} / kWh` },
  ];

  return { units, breakdown };
}

function calculateRuraflex(input: CalculationInput): CalculationResult | { error: string } {
  const { amount, options } = input;
  const tariff = input.tariff as any;
  // Use a standard month
  const days = 30.4375;
  // Check for notified demand if possible, else assume 50 kVA
  const notifiedDemand = options.notifiedDemand || 50;
  // Use typical usage split: peak 10%, std 35%, off-peak 55%
  const tou = options.touPercentages || { peak: 10, standard: 35, offPeak: 55 };
  // Calculate fixed charges (monthly)
  const service = tariff.service_charge_R_per_POD_day * days;
  const admin = tariff.admin_charge_R_per_POD_day * days;
  const networkCap = tariff.network_capacity_charge_R_per_kVA_month * notifiedDemand;
  const genCap = tariff.generation_capacity_charge_R_per_kVA_month * notifiedDemand;
  const fixed = service + admin + networkCap + genCap;

  if (amount < fixed) {
    return { error: `Amount (R ${amount.toFixed(2)}) is less than the fixed monthly charges (R ${fixed.toFixed(2)}).` };
  }
  const amountForEnergy = amount - fixed;

  // Weighted energy rate—composite of TOU bands and all c/kWh add-ons
  const peakRate = tariff.energy_peak_c_per_kWh + tariff.network_demand_charge_c_per_kWh + tariff.legacy_charge_c_per_kWh + tariff.ancillary_service_charge_c_per_kWh + tariff.reactive_energy_high_season_c_per_kWh;
  const standardRate = tariff.energy_standard_c_per_kWh + tariff.network_demand_charge_c_per_kWh + tariff.legacy_charge_c_per_kWh + tariff.ancillary_service_charge_c_per_kWh + tariff.reactive_energy_high_season_c_per_kWh;
  const offPeakRate = tariff.energy_off_peak_c_per_kWh + tariff.network_demand_charge_c_per_kWh + tariff.legacy_charge_c_per_kWh + tariff.ancillary_service_charge_c_per_kWh + tariff.reactive_energy_high_season_c_per_kWh;

  const weightedAvg = (
    (peakRate * (tou.peak / 100)) +
    (standardRate * (tou.standard / 100)) +
    (offPeakRate * (tou.offPeak / 100))
  ) / 100;

  if (weightedAvg <= 0) return { error: "Invalid weighted average rate for this Ruraflex tariff." };

  const units = amountForEnergy / weightedAvg;

  const breakdown = [
    { label: "Service Charge", value: `R ${service.toFixed(2)}` },
    { label: "Admin Charge", value: `R ${admin.toFixed(2)}` },
    { label: "Network Capacity (est)", value: `R ${networkCap.toFixed(2)} (${notifiedDemand} kVA)` },
    { label: "Generation Capacity (est)", value: `R ${genCap.toFixed(2)} (${notifiedDemand} kVA)` },
    { label: "Energy Used", value: `R ${amountForEnergy.toFixed(2)}` },
    { label: "Weighted Avg. Energy Rate", value: `R ${weightedAvg.toFixed(4)} / kWh` },
    { label: "Usage Distribution", value: `Peak: ${tou.peak}%, Std: ${tou.standard}%, Off-peak: ${tou.offPeak}%` }
  ];

  return { units, breakdown };
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

  // Add new rural tariff paths
  if (tariff.name === 'Megaflex') {
    return calculateMegaflex({ amount, tariff, options });
  }
  if (tariff.name === 'Ruraflex') {
    return calculateRuraflex({ amount, tariff, options });
  }

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
