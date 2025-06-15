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
    <Card className="mb-10 shadow-lg border-0 bg-gradient-to-br p-0 animate-fade-in transition-all hover:scale-105 duration-200 max-w-[98vw] sm:max-w-full mx-auto">
      <CardHeader
        className={`rounded-t-lg px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r ${headingStyle.color}`}
      >
        <CardTitle className="font-playfair text-xl sm:text-2xl flex items-center gap-2 break-words">
          <span>{headingStyle.icon}</span>{tariff.name}
        </CardTitle>
        <CardDescription className="text-sm sm:text-md mt-1 font-semibold text-primary/80">
          {tariff.tariff_type} | {tariff.customer_type}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4 px-4 sm:px-7 text-base font-medium grid gap-2">
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
                <li key={idx} className="text-sm sm:text-base">
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
        <div className="mt-2 opacity-80 text-[13px] break-all">
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-8 px-0 sm:px-2">
        <div className="mx-auto max-w-5xl w-full px-1 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-extrabold mb-7 sm:mb-8 text-center tracking-tight text-primary animate-fade-in">
            Understanding SA Electricity Tariffs (2025/26)
          </h1>
          <section className="mb-8 text-base sm:text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed animate-fade-in">
            <p className="font-bold text-primary text-lg sm:text-xl mb-2">What is an electricity tariff?</p>
            <p>
              An <span className="font-semibold text-green-700 dark:text-green-300">electricity tariff</span> is more than just a price per kWh: it’s a set of rules that determines how much you pay depending on when, how much, and sometimes even who you are.
            </p>
            <ul className="list-disc text-left text-sm sm:text-base font-normal mx-auto mt-4 mb-4 pl-5 sm:pl-7 space-y-2">
              <li>
                <span className="font-bold text-blue-700 dark:text-blue-300">Inclining Block Tariffs:</span>{" "}
                The more power you use in a month, the higher your unit rate becomes. Lower users pay less per unit!
              </li>
              <li>
                <span className="font-bold text-amber-700 dark:text-yellow-300">Time of Use (TOU) Tariffs:</span>{" "}
                Rates change depending on <span className="font-semibold text-blue-800 dark:text-blue-200">time of day</span> (peak, standard, off-peak) and <span className="font-semibold text-amber-700 dark:text-yellow-200">season</span>.
                Use appliances off-peak or in low season to save.
              </li>
              <li>
                <span className="font-bold text-green-700 dark:text-green-400">Flat & Subsidized Rates:</span>{" "}
                Special low rates for lifelong users or those needing support, regardless of use.
              </li>
            </ul>
            <p>
              <span className="font-semibold text-cyan-700 dark:text-cyan-300">Tip:</span> 
                Modern smart/prepaid meters often show tariff blocks and bands, so you can monitor usage and optimize for savings.
            </p>
          </section>
          {/* Carousel remains */}
          <section className="mb-10 md:mb-14">
            <ProvinceTariffsCarousel />
          </section>
          <section>
            <div className="mb-3 text-xl sm:text-2xl font-bold text-primary/80 font-playfair text-center">
              National & Major City Tariffs Compared
            </div>
            <div className="mb-8 text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Browse the detailed breakdowns for each tariff below! See how each structure works, who qualifies, and find tips to minimize your future bills.
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
