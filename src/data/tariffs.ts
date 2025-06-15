import { tariffs } from './tariffs';

export interface Tariff {
  customer_type: string;
  description: string;
  tariff_type: 'Flat Rate' | 'Unbundled Flat Rate' | 'Time-of-Use' | string;
  notes?: string;
  // Flat Rate
  energy_charge_c_per_kWh_vat_incl?: number;
  // Unbundled
  service_charge_R_per_POD_per_day_vat_incl?: number;
  administration_charge_R_per_POD_per_day_vat_incl?: number;
  network_capacity_charge_R_per_kVA_per_month_vat_incl?: number;
  // TOU
  time_of_use_periods?: {
    high_demand_season: string;
    low_demand_season: string;
    peak_hours_high_season?: string;
    peak_hours_low_season?: string;
    standard_hours?: string;
    off_peak_hours?: string;
  };
  energy_charges?: {
    high_demand_season: {
      peak_c_per_kWh_vat_incl: number;
      standard_c_per_kWh_vat_incl: number;
      off_peak_c_per_kWh_vat_incl: number;
    };
    low_demand_season: {
      peak_c_per_kWh_vat_incl: number;
      standard_c_per_kWh_vat_incl: number;
      off_peak_c_per_kWh_vat_incl: number;
    };
  };
  // A catch-all for any other properties
  [key: string]: any;
}

export const tariffs: { [key: string]: Tariff } = {
  "Homelight_20A": {
    "customer_type": "Residential",
    "description": "Standard residential customers with 20A supply.",
    "tariff_type": "Flat Rate",
    "energy_charge_c_per_kWh_vat_incl": 285.07,
    "notes": "Simplified flat rate structure, suitable for low-usage households."
  },
  "Homelight_60A": {
    "customer_type": "Residential",
    "description": "Standard residential customers with 60A supply (prepayment or conventional).",
    "tariff_type": "Flat Rate",
    "energy_charge_c_per_kWh": 247.89,
    "energy_charge_c_per_kWh_vat_incl": 285.07,
    "notes": "Simplified flat rate structure, suitable for most households."
  },
  "Homepower_Standard": {
    "customer_type": "Residential",
    "description": "For customers with higher consumption, featuring unbundled charges.",
    "tariff_type": "Unbundled Flat Rate",
    "energy_charge_c_per_kWh_vat_incl": 258.67,
    "legacy_charge_c_per_kWh_vat_incl": 26.20,
    "network_demand_charge_c_per_kWh_vat_incl": 70.91,
    "ancillary_service_charge_c_per_kWh_vat_incl": 0.47,
    "electrification_rural_subsidy_c_per_kWh_vat_incl": 5.68,
    "affordability_subsidy_c_per_kWh_vat_incl": 5.39,
    "service_charge_R_per_POD_per_day_vat_incl": 28.18,
    "administration_charge_R_per_POD_per_day_vat_incl": 0.86,
    "network_capacity_charge_R_per_kVA_per_month_vat_incl": 178.62,
    "notes": "Requires specifying Notified Maximum Demand (NMD) in kVA."
  },
  "Homeflex": {
    "customer_type": "Residential",
    "description": "Time-of-Use tariff for customers who can shift load to off-peak times.",
    "tariff_type": "Time-of-Use",
    "time_of_use_periods": {
      "high_demand_season": "1 June to 31 August (Winter)",
      "low_demand_season": "1 September to 31 May (Summer)",
      "peak_hours_high_season": "06:00-08:00 & 17:00-20:00",
      "peak_hours_low_season": "07:00-09:00 & 18:00-21:00",
      "standard_hours": "Weekdays excluding peak and off-peak, Sun 17:00-19:00",
      "off_peak_hours": "22:00-06:00 weekdays, weekends excl. Sun evening"
    },
    "energy_charges": {
      "high_demand_season": {
        "peak_c_per_kWh_vat_incl": 839.34,
        "standard_c_per_kWh_vat_incl": 209.84,
        "off_peak_c_per_kWh_vat_incl": 139.89
      },
      "low_demand_season": {
        "peak_c_per_kWh_vat_incl": 348.25,
        "standard_c_per_kWh_vat_incl": 195.98,
        "off_peak_c_per_kWh_vat_incl": 139.89
      }
    },
    "service_charge_R_per_POD_per_day_vat_incl": 28.18,
    "administration_charge_R_per_POD_per_day_vat_incl": 0.86,
    "network_capacity_charge_R_per_kVA_per_month_vat_incl": 178.62,
    "notes": "Ideal for homes with EVs or solar. Requires NMD in kVA."
  },
};
