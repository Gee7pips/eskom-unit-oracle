import { tariffs } from './tariffs';

export interface ProvinceTariffInfo {
  name: string;
  tariff_type: string;
  customer_type: string;
  description: string;
  eligibility: string;
  tariffKey?: keyof typeof tariffs;
}

export type ProvinceData = Record<string, ProvinceTariffInfo[]>;

const nameToKeyMap: Record<string, keyof typeof tariffs> = {
  "Homelight 20A": "Homelight_20A",
  "Homelight 60A": "Homelight_60A",
  "Homepower 2": "Homeflex",
  "Megaflex": "Megaflex",
  "Ruraflex": "Ruraflex",
  "Affordability Tariff": "Affordability_Tariff",
};

const rawProvinceData: Record<string, Omit<ProvinceTariffInfo, 'tariffKey'>[]> = {
  "Gauteng": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Low-usage prepaid tariff with rising rates per block.", "eligibility": "Low-income households, prepaid users." },
    { "name": "Homelight 60A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Standard prepaid tariff for higher residential usage.", "eligibility": "Urban households, prepaid meters." },
    { "name": "Homepower 1", "tariff_type": "Flat Rate + Fixed Monthly Charge", "customer_type": "Residential", "description": "Postpaid flat-rate tariff with a fixed monthly fee.", "eligibility": "Middle-to-upper income homes with postpaid meters." },
    { "name": "Homepower 2", "tariff_type": "Time of Use (TOU)", "customer_type": "Residential", "description": "TOU tariff with peak, standard, and off-peak pricing.", "eligibility": "Homes with high usage and flexible consumption." },
    { "name": "Urban Small", "tariff_type": "Flat Rate / TOU", "customer_type": "Commercial", "description": "Standard tariff for small businesses in urban areas.", "eligibility": "Shops, SMMEs, office buildings under 100kVA." },
    { "name": "Megaflex", "tariff_type": "Time of Use (TOU)", "customer_type": "Industrial", "description": "Advanced TOU tariff for large power users.", "eligibility": "Factories, mines, bulk users over 1MVA." }
  ],
  "Western Cape": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Entry-level prepaid for minimal consumption.", "eligibility": "Rural/urban low-income homes." },
    { "name": "Homelight 60A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "More power than 20A with the same block system.", "eligibility": "Townships, middle-income families." },
    { "name": "Homepower 1", "tariff_type": "Flat Rate + Fixed Monthly Charge", "customer_type": "Residential", "description": "Postpaid homes using consistent daily electricity.", "eligibility": "Middle-income suburbs, coastal estates." },
    { "name": "Urban Small", "tariff_type": "Flat Rate / TOU", "customer_type": "Business", "description": "Commercial tariff for SMEs.", "eligibility": "Retailers, service businesses." },
    { "name": "Ruraflex", "tariff_type": "Time of Use (TOU)", "customer_type": "Agricultural", "description": "TOU tariff with seasonal pricing for farms.", "eligibility": "Irrigation farms, agri businesses." },
    { "name": "Landrate", "tariff_type": "Seasonal Flat", "customer_type": "Agricultural", "description": "Simplified seasonal tariff for rural/agricultural supply.", "eligibility": "Remote farms, consistent load equipment." }
  ],
  "KwaZulu-Natal": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Low-usage prepaid tariff with block rate.", "eligibility": "Rural homes, prepaid meter areas." },
    { "name": "Homelight 60A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Higher cap prepaid for rural and township households.", "eligibility": "Moderate-income homes with prepaid supply." },
    { "name": "Ruraflex", "tariff_type": "Time of Use (TOU)", "customer_type": "Agricultural", "description": "TOU tariff with seasonal peak pricing.", "eligibility": "Pump stations, irrigation, large rural loads." },
    { "name": "Landrate", "tariff_type": "Seasonal Flat", "customer_type": "Agricultural", "description": "Flat seasonal pricing for large land users.", "eligibility": "Commercial farms, sugar mills." },
    { "name": "Affordability Tariff", "tariff_type": "Subsidized Flat Rate", "customer_type": "Residential", "description": "Lifeline tariff for indigent households under a limit.", "eligibility": "Very low-income families, registered indigent list." }
  ],
  "Eastern Cape": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Very low-usage prepaid tariff.", "eligibility": "Remote village homes, low-demand setups." },
    { "name": "Ruraflex", "tariff_type": "TOU", "customer_type": "Agricultural", "description": "Rural flexible tariff using TOU logic.", "eligibility": "Pumps, boreholes, and seasonal operations." },
    { "name": "Landrate", "tariff_type": "Flat Seasonal", "customer_type": "Agricultural", "description": "Flat seasonal billing with no TOU complexity.", "eligibility": "Farms using basic load profiles." },
    { "name": "Affordability Tariff", "tariff_type": "Flat Subsidized", "customer_type": "Residential", "description": "Discounted rate for ultra-low consumption homes.", "eligibility": "Qualifying rural and township households." }
  ],
  "Free State": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Small prepaid supply with low capacity.", "eligibility": "Direct Eskom homes in towns or rural." },
    { "name": "Miniflex", "tariff_type": "TOU", "customer_type": "Industrial", "description": "Smaller-scale version of Megaflex.", "eligibility": "Small factories, mills, water plants." },
    { "name": "Landrate", "tariff_type": "Flat Rate", "customer_type": "Agricultural", "description": "Rural rate based on agricultural load curve.", "eligibility": "Farms, remote agribusinesses." }
  ],
  "North West": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Base-level prepaid option.", "eligibility": "Villages, informal settlements." },
    { "name": "Ruraflex", "tariff_type": "TOU", "customer_type": "Agricultural", "description": "TOU for seasonal agricultural demand.", "eligibility": "Irrigation or crop cycle loads." },
    { "name": "Landrate", "tariff_type": "Flat Rate", "customer_type": "Agricultural", "description": "Simplified tariff for continuous farming loads.", "eligibility": "Cattle farms, rural homesteads." }
  ],
  "Limpopo": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Ultra-basic prepaid option.", "eligibility": "Low-income households off-grid." },
    { "name": "Ruraflex", "tariff_type": "TOU", "customer_type": "Agricultural", "description": "Cost-effective tariff with peak avoidance.", "eligibility": "Pump-dependent farms and tribal areas." },
    { "name": "Affordability Tariff", "tariff_type": "Flat Subsidized", "customer_type": "Residential", "description": "Free basic electricity + discount beyond.", "eligibility": "Government-listed indigent homes." }
  ],
  "Mpumalanga": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Starter prepaid for homes in townships.", "eligibility": "Municipal bypass or direct Eskom zones." },
    { "name": "Miniflex", "tariff_type": "TOU", "customer_type": "Commercial", "description": "Flexible TOU for small manufacturers.", "eligibility": "Mines, energy farms, commercial loads." },
    { "name": "Megaflex", "tariff_type": "TOU", "customer_type": "Industrial", "description": "Full-scale peak pricing with network charges.", "eligibility": "Bulk consumers like Eskom partners." }
  ],
  "Northern Cape": [
    { "name": "Homelight 20A", "tariff_type": "Inclining Block", "customer_type": "Residential", "description": "Cheapest prepaid option for low load.", "eligibility": "Far-flung areas and informal towns." },
    { "name": "Ruraflex", "tariff_type": "TOU", "customer_type": "Agricultural", "description": "Seasonal TOU best for water pump usage.", "eligibility": "Solar/diesel hybrid farms needing Eskom top-up." },
    { "name": "Time-of-Use (TOU)", "tariff_type": "TOU", "customer_type": "Industrial", "description": "Standard time-sensitive billing.", "eligibility": "Factories, desalination plants, and farms." }
  ]
};

export const provinceTariffs: ProvinceData = Object.entries(rawProvinceData).reduce((acc, [province, tariffList]) => {
  acc[province] = tariffList.map(tariff => ({
    ...tariff,
    tariffKey: nameToKeyMap[tariff.name],
  }));
  return acc;
}, {} as ProvinceData);
