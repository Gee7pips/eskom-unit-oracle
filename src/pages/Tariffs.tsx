import { tariffs, Tariff } from "@/data/tariffs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ProvinceTariffsCarousel from "@/components/ProvinceTariffsCarousel";
import { SeoHead } from "@/components/SeoHead";

const headings = {
  "Inclining Block": { color: "from-green-400 via-blue-300 to-yellow-100", icon: "🔼" },
  "Time of Use (TOU)": { color: "from-blue-200 via-indigo-200 to-gray-100", icon: "⏱️" },
  "Subsidized Flat Rate": { color: "from-yellow-100 via-green-200 to-green-50", icon: "💰" },
};

function TariffDetailCard({ tariff }: { tariff: Tariff }) {
  const headingStyle = headings[tariff.tariff_type];
  return (
    <Card className="mb-9 shadow-lg border-0 bg-gradient-to-br p-0 animate-fade-in transition-all hover:scale-105 duration-200"
      style={{ backgroundImage: undefined }}
    >
      <CardHeader className={`rounded-t-lg px-6 py-4 bg-gradient-to-r ${headingStyle.color}`}>
        <CardTitle className="font-playfair text-2xl flex items-center gap-2">
          <span>{headingStyle.icon}</span>{tariff.name}
        </CardTitle>
        <CardDescription className="text-md mt-1 font-semibold text-primary/80">
          {tariff.tariff_type} | {tariff.customer_type}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-5 px-7 text-base font-medium grid gap-2">
        <div>
          <span className="inline-block font-bold">Eligibility:</span> {tariff.eligibility}
        </div>
        <div>
          <span className="inline-block font-bold">VAT included:</span> {tariff.vat_included ? "Yes" : "No"}
        </div>
        <div>
          <span className="inline-block font-bold">Regions:</span>{" "}
          {typeof tariff.regions === "string"
            ? tariff.regions
            : Object.keys(tariff.regions).map((region) => (
                <span key={region} className="inline-flex mr-2">{region} ({tariff.regions[region]})</span>
              ))}
        </div>
        {tariff.tariff_type === "Inclining Block" && (
          <div>
            <span className="font-bold">Tariff Blocks:</span>
            <ul className="mt-1 ml-4 list-disc">
              {(tariff as any).blocks.map((b: any, idx: number) => (
                <li key={idx}>
                  <span>
                    {b.to_kWh
                      ? `${b.from_kWh}–${b.to_kWh} kWh @ R${(b.rate_c_per_kWh / 100).toFixed(2)}`
                      : `${b.from_kWh}+ kWh @ R${(b.rate_c_per_kWh / 100).toFixed(2)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tariff.tariff_type === "Time of Use (TOU)" && typeof (tariff as any).periods !== "string" && (
          <div>
            <span className="font-bold">Seasons & Periods:</span>
            <ul className="ml-4 mt-1 list-disc">
              <li>
                <span className="font-semibold">High Season:</span>
                Peak: R{((tariff as any).periods.high_season_peak.rate_c_per_kWh / 100).toFixed(2)} ({(tariff as any).periods.high_season_peak.hours} hrs, {(tariff as any).periods.high_season_peak.months})<br />
                Standard: R{((tariff as any).periods.high_season_standard.rate_c_per_kWh / 100).toFixed(2)}<br />
                Off-Peak: R{((tariff as any).periods.high_season_off_peak.rate_c_per_kWh / 100).toFixed(2)}
              </li>
              <li>
                <span className="font-semibold">Low Season:</span>
                Peak: R{((tariff as any).periods.low_season_peak.rate_c_per_kWh / 100).toFixed(2)}<br />
                Standard: R{((tariff as any).periods.low_season_standard.rate_c_per_kWh / 100).toFixed(2)}<br />
                Off-Peak: R{((tariff as any).periods.low_season_off_peak.rate_c_per_kWh / 100).toFixed(2)}
              </li>
            </ul>
          </div>
        )}
        {tariff.tariff_type === "Subsidized Flat Rate" && (
          <div>
            <span className="font-bold">Flat rate:</span> R{((tariff as any).energy_rate_c_per_kWh / 100).toFixed(2)} / kWh
          </div>
        )}
        {"fixed_monthly_charge_R" in tariff && typeof (tariff as any).fixed_monthly_charge_R === "number" ? (
          <div>
            <span className="font-bold">Fixed monthly charge:</span> R{(tariff as any).fixed_monthly_charge_R.toFixed(2)}
          </div>
        ) : (
          <div>
            <span className="font-bold">Fixed monthly charge:</span> None
          </div>
        )}
        <div className="mt-2 opacity-80 text-[13px]">
          <span className="font-semibold">Source:</span>{" "}
          <a href="#" className="underline text-blue-700 dark:text-blue-200">{tariff.source}</a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TariffsPage() {
  return (
    <>
      <SeoHead
        title="Tariffs Explained – EskomCalc Pro Tariff Guide 2025/26"
        description="Explore South African prepaid and postpaid Eskom tariffs. Learn about inclining block rates, TOU plans, and see how all provinces compare for 2025/26."
        canonicalUrl="https://preview--eskom-unit-oracle.lovable.app/tariffs"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-12 px-2">
        <div className="mx-auto max-w-5xl p-5">
          <h1 className="text-4xl font-playfair font-extrabold mb-8 text-center tracking-tight text-primary animate-fade-in">
            South Africa Electricity Tariffs Explained (2025/26)
          </h1>
          <div className="mb-8 text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            <span className="font-bold text-primary">What are electricity tariffs?</span><br />
            Electricity tariffs are the price structures Eskom and municipalities use to charge households, businesses, and farms for using the grid. There are several types:
            <ul className="list-disc text-left text-base font-normal mx-auto mt-3 mb-4 pl-7">
              <li>
                <span className="font-bold">Inclining Block Tariffs:</span> The more you use in a month, the higher your rate per unit becomes – a system designed to reward energy saving.
              </li>
              <li>
                <span className="font-bold">Time of Use (TOU) Tariffs:</span> The price changes depending on the time of day (peak, standard, off-peak) and season (high, low), signaling when the grid is most/least stressed.
              </li>
              <li>
                <span className="font-bold">Flat & Subsidized Rates:</span> Fixed rates for vulnerable or low-income customers, regardless of how much is used.
              </li>
            </ul>
            <span className="font-semibold">
              <span className="inline-block text-green-700 dark:text-green-300">Modern prepaid meters</span> let you see your usage and which tariff block or time band you're on, making it easier to plan and save.
            </span>
          </div>

          <div className="mb-14 md:mb-16">
            <ProvinceTariffsCarousel />
          </div>
          
          <div className="mb-4 text-2xl font-bold text-primary/80 font-playfair text-center">
            All National & City Tariffs in Detail
          </div>
          <div className="mb-8 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Below you'll find expanded details of tariffs, blocks, TOU bands, and region-specific rates, for deep-dive comparison.
          </div>
          <div>
            {Object.values(tariffs).map((tariff: Tariff) => (
              <TariffDetailCard key={tariff.name} tariff={tariff} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
