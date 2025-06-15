
import { EskomCalculator } from "@/components/EskomCalculator";
import HomeWelcome from "@/components/HomeWelcome";
import ProvinceTariffsCarousel from "@/components/ProvinceTariffsCarousel";
import CalculatorTips from "@/components/CalculatorTips";
import { SeoHead } from "@/components/SeoHead";
import React from "react";

const FEATURES = [
  {
    icon: "⚡️",
    title: "Up-to-date Eskom tariffs",
    desc: "2025/26 rates for all provinces and plans instantly calculated."
  },
  {
    icon: "🔍",
    title: "See your real savings",
    desc: "Transparent cost breakdown with unit pricing for smarter budgeting."
  },
  {
    icon: "🎯",
    title: "Choose your best plan",
    desc: "Compare inclining block & TOU options side-by-side."
  },
  {
    icon: "🛡️",
    title: "Trusted and Free",
    desc: "No login required. Accuracy you can rely on, 100% free."
  }
];

export default function Index() {
  return (
    <>
      <SeoHead
        title="EskomCalc Pro – South Africa’s Most Accurate Eskom Tariff Calculator (2025/26)"
        description="Calculate how many electricity units (kWh) you get for your money in South Africa. Compare Eskom tariffs, see up-to-date province rates, and make smarter prepaid choices."
        canonicalUrl="https://preview--eskom-unit-oracle.lovable.app/"
      />
      <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 flex flex-col items-center px-2 pt-1">
        <header className="w-full flex flex-col items-center">
          <HomeWelcome />
          <nav aria-label="Quick navigation" className="mb-8 mt-2 w-full max-w-2xl flex justify-center gap-4">
            <a href="/tariffs" className="rounded-xl px-5 py-2 font-semibold bg-gradient-to-r from-green-400 via-blue-300 to-blue-500/70 text-white hover:scale-105 shadow-md duration-150">
              Tariffs Explained
            </a>
            <a href="/blog" className="rounded-xl px-5 py-2 font-semibold bg-gradient-to-r from-blue-500 via-green-400 to-green-700/60 text-white hover:scale-105 shadow-md duration-150">
              Blog & Tips
            </a>
          </nav>
        </header>

        <section aria-label="Calculator location" className="w-full flex justify-center mt-4 animate-fade-in">
          <EskomCalculator />
        </section>

        <section aria-label="Features" className="w-full max-w-4xl my-10 grid md:grid-cols-4 gap-4 text-center">
          {FEATURES.map((f, i) => (
            <div key={i} className="rounded-2xl bg-white/80 dark:bg-slate-800/60 shadow-lg border border-primary/10 p-5 flex flex-col items-center justify-center h-full transition-all hover:shadow-2xl">
              <span className="text-4xl mb-2">{f.icon}</span>
              <dt className="font-bold text-lg mb-1 font-playfair text-primary">{f.title}</dt>
              <dd className="text-muted-foreground text-[15px]">{f.desc}</dd>
            </div>
          ))}
        </section>

        <section aria-label="Tariff comparisons" className="w-full mt-8 animate-fade-in">
          <ProvinceTariffsCarousel />
        </section>

        <section aria-label="Calculator tips & education" className="w-full max-w-2xl mt-8 mb-6 animate-fade-in">
          <CalculatorTips />
        </section>

        {/* Add testimonials or call to action for extra engagement */}
        <section className="w-full my-6 flex flex-col items-center">
          <div className="bg-gradient-to-tr from-blue-100 to-green-200 dark:from-blue-900/40 dark:to-green-900/30 px-6 py-6 rounded-2xl shadow-xl border border-primary/10 max-w-2xl text-center animate-fade-in">
            <h3 className="font-bold text-xl font-playfair mb-2 text-primary">🔥 EskomCalc Pro helps thousands of South Africans save monthly!</h3>
            <p className="mb-3 text-muted-foreground">See your real prepaid savings, instantly. Trust our fast, 2025/26-updated engine to reveal the best tariff for your home or business – every time you recharge.</p>
            <a href="/tariffs" className="inline-block rounded-xl px-5 py-2 mt-1 font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-105 shadow-lg duration-100">Learn About Tariffs</a>
          </div>
        </section>
      </main>
    </>
  );
}
