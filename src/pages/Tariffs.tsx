
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
        {tariff.tariff_type === "Inclining Block" && "blocks" in tariff && (
          <div>
            <span className="font-bold">Tariff Blocks:</span>
            <ul className="mt-1 ml-4 list-disc">
              {tariff.blocks.map((b, idx) => (
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
        {tariff.tariff_type === "Time of Use (TOU)" && "periods" in tariff && typeof tariff.periods !== "string" && (
          <div>
            <span className="font-bold">Seasons & Periods:</span>
            <ul className="ml-4 mt-1 list-disc">
              <li>
                <span className="font-semibold">High Season:</span>
                Peak: R{typeof tariff.periods.high_season_peak.rate_c_per_kWh === "number"
                  ? (tariff.periods.high_season_peak.rate_c_per_kWh / 100).toFixed(2)
                  : "N/A"
                } ({tariff.periods.high_season_peak.hours}, {tariff.periods.high_season_peak.months})<br />
                Standard: R{typeof tariff.periods.high_season_standard.rate_c_per_kWh === "number"
                  ? (tariff.periods.high_season_standard.rate_c_per_kWh / 100).toFixed(2)
                  : "N/A"
                }<br />
                Off-Peak: R{typeof tariff.periods.high_season_off_peak.rate_c_per_kWh === "number"
                  ? (tariff.periods.high_season_off_peak.rate_c_per_kWh / 100).toFixed(2)
                  : "N/A"
                }
              </li>
              <li>
                <span className="font-semibold">Low Season:</span>
                Peak: R{typeof tariff.periods.low_season_peak.rate_c_per_kWh === "number"
                  ? (tariff.periods.low_season_peak.rate_c_per_kWh / 100).toFixed(2)
                  : "N/A"
                }<br />
                Standard: R{typeof tariff.periods.low_season_standard.rate_c_per_kWh === "number"
                  ? (tariff.periods.low_season_standard.rate_c_per_kWh / 100).toFixed(2)
                  : "N/A"
                }<br />
                Off-Peak: R{typeof tariff.periods.low_season_off_peak.rate_c_per_kWh === "number"
                  ? (tariff.periods.low_season_off_peak.rate_c_per_kWh / 100).toFixed(2)
                  : "N/A"
                }
              </li>
            </ul>
          </div>
        )}
        {tariff.tariff_type === "Subsidized Flat Rate" && "energy_rate_c_per_kWh" in tariff && (
          <div>
            <span className="font-bold">Flat rate:</span> R{(tariff.energy_rate_c_per_kWh / 100).toFixed(2)} / kWh
          </div>
        )}
        {"fixed_monthly_charge_R" in tariff && typeof tariff.fixed_monthly_charge_R === "number" ? (
          <div>
            <span className="font-bold">Fixed monthly charge:</span> R{tariff.fixed_monthly_charge_R.toFixed(2)}
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
        title="South African Electricity Tariffs Explained – 2025/26 Guide"
        description="A plain-language, up-to-date guide to Eskom and municipal electricity tariffs in South Africa – explore how each structure works, who qualifies, and how to optimize your bill."
        canonicalUrl="https://preview--eskom-unit-oracle.lovable.app/tariffs"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-12 px-2">
        <div className="mx-auto max-w-5xl p-5">
          <h1 className="text-4xl md:text-5xl font-playfair font-extrabold mb-8 text-center tracking-tight text-primary animate-fade-in">
            Understanding SA Electricity Tariffs (2025/26)
          </h1>
          <div className="mb-8 text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            <p className="font-bold text-primary text-xl mb-2">What is an electricity tariff?</p>
            <p>
              An electricity tariff is the price structure your utility provider (Eskom or municipality) uses to charge you for using grid electricity. It isn't just the rate per unit (kWh); it's a set of rules that determines how much you pay depending on when, how much, or even who you are.
            </p>
            <ul className="list-disc text-left text-base font-normal mx-auto mt-4 mb-4 pl-7 space-y-2">
              <li>
                <span className="font-bold">Inclining Block Tariffs:</span>{" "}
                The more power you use in a month, the higher your rate per unit becomes. These blocks are designed to reward those who save, and charge more for higher consumption.
              </li>
              <li>
                <span className="font-bold">Time of Use (TOU) Tariffs:</span>{" "}
                Prices change depending on <span className="font-semibold text-blue-800 dark:text-blue-200">time of day</span> (peak, standard, off-peak) and <span className="font-semibold text-amber-700 dark:text-yellow-200">season</span> (high, low demand). Pay less when the grid is under less stress and more at peak grid demand.
              </li>
              <li>
                <span className="font-bold">Flat & Subsidized Rates:</span>{" "}
                Fixed rates aimed at supporting vulnerable or low-income households, no matter how much you use.
              </li>
            </ul>
            <p>
              <span className="font-semibold text-green-700 dark:text-green-300">
                Modern prepaid smart meters
              </span>{" "}
              can show which tariff block or time band your usage falls into, helping you monitor and reduce your bill.
            </p>
          </div>

          <section className="mb-14 md:mb-16">
            <ProvinceTariffsCarousel />
          </section>
          
          <section>
            <div className="mb-4 text-2xl font-bold text-primary/80 font-playfair text-center">
              Detailed National & City Tariffs
            </div>
            <div className="mb-8 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Explore below for in-depth breakdowns of how each tariff works, all available blocks and periods, and who qualifies. Use this knowledge to compare and choose, or simply get transparency about your energy spend.
            </div>
            <div>
              {Object.values(tariffs).map((tariff: Tariff) => (
                <TariffDetailCard key={tariff.name} tariff={tariff} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

