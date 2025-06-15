
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

export type Tariff = IncliningBlockTariff | TOUTariff | SubsidizedFlatRateTariff;

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
    "name": "Megaflex",
    "tariff_type": "Time of Use (TOU)",
    "customer_type": "Industrial",
    "periods": "see Eskom Schedule",
    "network_capacity_charge_R_per_kVA": "<CAPACITY>",
    "generation_capacity_charge_R_per_kVA": "<GEN_CAPACITY>",
    "ancillary_c_per_kWh": "<ANCILLARY>",
    "fixed_monthly_charge_R": null,
    "vat_included": false,
    "eligibility": "Industrial >1 MVA",
    "regions": "Applicable national",
    "source": "Eskom Schedule of Standard Prices Apr 2025"
  },
  "Ruraflex": {
    "name": "Ruraflex",
    "tariff_type": "Time of Use (TOU)",
    "customer_type": "Agricultural",
    "periods": "Seasonal TOU — see Eskom Ruraflex PDF",
    "network_capacity_charge_R_per_kVA": "<NET_CAP>",
    "generation_capacity_charge_R_per_kVA": "<GEN_CAP>",
    "ancillary_c_per_kWh": "<ANCILLARY>",
    "fixed_monthly_charge_R": null,
    "vat_included": false,
    "eligibility": "Agricultural pumps, rural farms",
    "regions": "Major farming provinces (WC, EC, KZN, FS...)",
    "source": "Eskom Ruraflex Schedule Apr 2025"
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
