export interface IncliningBlockTariff {
  name: string;
  tariff_type: 'Inclining Block';
  customer_type: 'Residential';
  blocks: {
    from_kWh: number;
    to_kWh: number | null;
    rate_c_per_kWh: number;
  }[];
  fixed_monthly_charge_R: number;
  vat_included: boolean;
  eligibility: string;
  regions: Record<string, string>;
  source: string;
}

export interface TOUTariff {
  name: string;
  tariff_type: 'Time of Use (TOU)';
  customer_type: 'Residential' | 'Industrial' | 'Agricultural';
  periods:
    | {
        high_season_peak: { rate_c_per_kWh: number; hours: string; months: string };
        high_season_standard: { rate_c_per_kWh: number };
        high_season_off_peak: { rate_c_per_kWh: number };
        low_season_peak: { rate_c_per_kWh: number };
        low_season_standard: { rate_c_per_kWh: number };
        low_season_off_peak: { rate_c_per_kWh: number };
      }
    | string;
  fixed_monthly_charge_R: number | null;
  vat_included: boolean;
  eligibility: string;
  regions: Record<string, string> | string;
  source: string;
  network_capacity_charge_R_per_kVA?: string;
  generation_capacity_charge_R_per_kVA?: string;
  ancillary_c_per_kWh?: string;
}

export interface SubsidizedFlatRateTariff {
  name: string;
  tariff_type: 'Subsidized Flat Rate';
  customer_type: 'Residential';
  energy_rate_c_per_kWh: number;
  fixed_monthly_charge_R: number;
  vat_included: boolean;
  eligibility: string;
  regions: Record<string, string>;
  source: string;
}

export interface MegaflexTariff {
  name: string;
  tariff_type: 'Time of Use (TOU)';
  customer_type: 'Industrial';
  service_charge_R_per_POD_day: number;
  network_capacity_charge_R_per_POD_day: number;
  generation_capacity_charge_R_per_POD_day: number;
  network_demand_charge_c_per_kWh: number;
  ancillary_service_charge_c_per_kWh: number;
  energy_rate_c_per_kWh: number;
  vat_included: boolean;
  eligibility: string;
  regions: string;
  source: string;
}

export interface RuraflexTariff {
  name: string;
  tariff_type: 'Time of Use (TOU)';
  customer_type: 'Agricultural';
  service_charge_R_per_POD_day: number;
  admin_charge_R_per_POD_day: number;
  network_capacity_charge_R_per_kVA_month: number;
  generation_capacity_charge_R_per_kVA_month: number;
  network_demand_charge_c_per_kWh: number;
  legacy_charge_c_per_kWh: number;
  energy_peak_c_per_kWh: number;
  energy_standard_c_per_kWh: number;
  energy_off_peak_c_per_kWh: number;
  ancillary_service_charge_c_per_kWh: number;
  reactive_energy_high_season_c_per_kWh: number;
  vat_included: boolean;
  eligibility: string;
  regions: string;
  source: string;
}

export type Tariff = IncliningBlockTariff | TOUTariff | SubsidizedFlatRateTariff | MegaflexTariff | RuraflexTariff;

export const tariffs: { [key: string]: Tariff } = {
  "Homelight_20A": {
    "name": "Homelight 20A",
    "tariff_type": "Inclining Block",
    "customer_type": "Residential",
    "blocks": [
      { "from_kWh": 0, "to_kWh": 350, "rate_c_per_kWh": 219 },
      { "from_kWh": 351, "to_kWh": 600, "rate_c_per_kWh": 248 },
      { "from_kWh": 601, "to_kWh": null, "rate_c_per_kWh": 0 } 
    ],
    "fixed_monthly_charge_R": 0,
    "vat_included": true,
    "eligibility": "Low‑income prepaid households",
    "regions": { "JHB": "219c", "Cape": "219c", "Durban": "219c" },
    "source": "EcoFlow blog c/kWh table Apr 2025" 
  },
  "Homelight_60A": {
    "name": "Homelight 60A",
    "tariff_type": "Inclining Block",
    "customer_type": "Residential",
    "blocks": [
      { "from_kWh": 0, "to_kWh": 600, "rate_c_per_kWh": 267 },
      { "from_kWh": 601, "to_kWh": null, "rate_c_per_kWh": 454 }
    ],
    "fixed_monthly_charge_R": 0,
    "vat_included": true,
    "eligibility": "Urban prepaid households",
    "regions": { "JHB": "267c / 454c", "Cape": "267c / 454c" },
    "source": "EcoFlow blog c/kWh table Apr 2025"
  },
  "Homeflex": {
    "name": "Homeflex (Homepower 4)",
    "tariff_type": "Time of Use (TOU)",
    "customer_type": "Residential",
    "periods": {
      "high_season_peak": { "rate_c_per_kWh": 704, "hours": "06–08,17–20", "months": "Jun–Aug" },
      "high_season_standard": { "rate_c_per_kWh": 214 },
      "high_season_off_peak": { "rate_c_per_kWh": 102 },
      "low_season_peak": { "rate_c_per_kWh": 200 },
      "low_season_standard": { "rate_c_per_kWh": 230 },
      "low_season_off_peak": { "rate_c_per_kWh": 159 }
    },
    "fixed_monthly_charge_R": null,
    "vat_included": true,
    "eligibility": "Residential TOU meters, solar export",
    "regions": { "JHB": "structured by Eskom RTP", "Cape": "", "Durban": "" },
    "source": "EcoFlow homeflex TOU table Apr 2025"
  },
  "Megaflex": {
    name: "Megaflex",
    tariff_type: "Time of Use (TOU)",
    customer_type: "Industrial",
    service_charge_R_per_POD_day: 24.50,
    network_capacity_charge_R_per_POD_day: 96.66,
    generation_capacity_charge_R_per_POD_day: 5.37,
    network_demand_charge_c_per_kWh: 0.6166,
    ancillary_service_charge_c_per_kWh: 0.0041,
    energy_rate_c_per_kWh: 2.2493,
    vat_included: false,
    eligibility: "Bulk consumers >1 MVA",
    regions: "National",
    source: "Eskom comparison sheet Apr 2025"
  },
  "Ruraflex": {
    name: "Ruraflex",
    tariff_type: "Time of Use (TOU)",
    customer_type: "Agricultural",
    service_charge_R_per_POD_day: 23.15,
    admin_charge_R_per_POD_day: 1.35,
    network_capacity_charge_R_per_kVA_month: 52.14,
    generation_capacity_charge_R_per_kVA_month: 3.34,
    network_demand_charge_c_per_kWh: 0.4832,
    legacy_charge_c_per_kWh: 0.23,
    energy_peak_c_per_kWh: 2.8964,
    energy_standard_c_per_kWh: 1.6284,
    energy_off_peak_c_per_kWh: 1.1631,
    ancillary_service_charge_c_per_kWh: 0.0041,
    reactive_energy_high_season_c_per_kWh: 0.1983,
    vat_included: false,
    eligibility: "Farm pumps & rural loads",
    regions: "Bloemfontein & similar zones",
    source: "Eskom Ruraflex comparison Apr 2025"
  },
  "Affordability_Tariff": {
    "name": "Affordability Tariff",
    "tariff_type": "Subsidized Flat Rate",
    "customer_type": "Residential",
    "energy_rate_c_per_kWh": 200,
    "fixed_monthly_charge_R": 0,
    "vat_included": true,
    "eligibility": "Indigent households up to threshold",
    "regions": { "Limpopo": "200c", "EC": "200c", "KZN": "200c" },
    "source": "EcoFlow + Eskom affordability subsidy info"
  }
};
