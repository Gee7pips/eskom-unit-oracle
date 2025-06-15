
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
  let totalFixedCharge = 0;
  const breakdown = [];

  const serviceCharge = (tariff.service_charge_R_per_POD_per_day_vat_incl || 0) * AVG_DAYS_IN_MONTH;
  if (serviceCharge > 0) {
    totalFixedCharge += serviceCharge;
    breakdown.push({ label: "Monthly Service Charge", value: `R ${serviceCharge.toFixed(2)}` });
  }
  
  const adminCharge = (tariff.administration_charge_R_per_POD_per_day_vat_incl || 0) * AVG_DAYS_IN_MONTH;
  if (adminCharge > 0) {
    totalFixedCharge += adminCharge;
    breakdown.push({ label: "Monthly Admin Charge", value: `R ${adminCharge.toFixed(2)}` });
  }

  const capacityCharge = (tariff.network_capacity_charge_R_per_kVA_per_month_vat_incl || 0) * notifiedDemand;
  if (capacityCharge > 0) {
    totalFixedCharge += capacityCharge;
    breakdown.push({ label: "Network Capacity Charge", value: `R ${capacityCharge.toFixed(2)}` });
  }

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
    case 'Flat Rate': {
      const rateZAR = (tariff.energy_charge_c_per_kWh_vat_incl || 0) / 100;
      if (rateZAR <= 0) return { error: "Invalid rate for this tariff." };
      units = amountForEnergy / rateZAR;
      breakdown.push({ label: "Energy Cost", value: `R ${amountForEnergy.toFixed(2)}` });
      breakdown.push({ label: "Rate", value: `R ${rateZAR.toFixed(4)} / kWh` });
      break;
    }
    
    case 'Unbundled Flat Rate': {
      const totalCentsPerKwh = [
        'energy_charge_c_per_kWh_vat_incl', 'legacy_charge_c_per_kWh_vat_incl', 
        'network_demand_charge_c_per_kWh_vat_incl', 'ancillary_service_charge_c_per_kWh_vat_incl',
        'electrification_rural_subsidy_c_per_kWh_vat_incl', 'affordability_subsidy_c_per_kWh_vat_incl'
      ].reduce((sum, key) => sum + (tariff[key] || 0), 0);
      
      const rateZAR = totalCentsPerKwh / 100;
      if (rateZAR <= 0) return { error: "Invalid rate for this tariff." };
      units = amountForEnergy / rateZAR;
      breakdown.push({ label: "Energy Cost", value: `R ${amountForEnergy.toFixed(2)}` });
      breakdown.push({ label: "Combined Rate", value: `R ${rateZAR.toFixed(4)} / kWh` });
      break;
    }

    case 'Time-of-Use': {
        const season = options.season || 'low_demand_season';
        const percentages = options.touPercentages || { peak: 33.3, standard: 33.3, offPeak: 33.4 };
        
        const rates = tariff.energy_charges?.[season];
        if (!rates) return { error: "Invalid season or rates for this tariff." };

        const peakRate = rates.peak_c_per_kWh_vat_incl / 100;
        const stdRate = rates.standard_c_per_kWh_vat_incl / 100;
        const offPeakRate = rates.off_peak_c_per_kWh_vat_incl / 100;

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
      return { error: `Calculation for tariff type "${tariff.tariff_type}" is not yet implemented.` };
  }

  return { units, breakdown };
}
