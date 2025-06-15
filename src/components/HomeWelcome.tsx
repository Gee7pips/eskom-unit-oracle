
import React from "react";

export default function HomeWelcome() {
  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10 py-8">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold font-playfair text-primary mb-4 drop-shadow-sm">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">EskomCalc Pro</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-4 font-medium">
          South Africa's most advanced prepaid electricity calculator. Instantly estimate how many units you get for your money—compare tariffs, understand costs, and make smarter choices.
        </p>
        <ul className="list-none flex flex-col gap-2 mb-3 text-primary/90">
          <li className="flex items-center gap-2"><span className="text-green-600">✔️</span> Up-to-date 2025/26 tariffs for all provinces</li>
          <li className="flex items-center gap-2"><span className="text-green-600">✔️</span> Support for Inclining Block & TOU tariffs</li>
          <li className="flex items-center gap-2"><span className="text-green-600">✔️</span> Province and tariff plan selection</li>
          <li className="flex items-center gap-2"><span className="text-green-600">✔️</span> Instant results with clear breakdown</li>
        </ul>
      </div>
      <div className="relative flex-1 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=450&q=80"
          alt="Electricity utilities"
          className="rounded-3xl shadow-2xl border-4 border-white/70 bg-slate-100 bg-opacity-60 w-[340px] aspect-[10/11] object-cover"
        />
        <div
          className="pointer-events-none absolute -right-6 -top-9 rotate-3 bg-gradient-to-br from-blue-100 to-green-300 shadow-xl rounded-2xl px-4 py-2 text-base text-blue-800 font-bold opacity-80 border border-blue-200"
          style={{ zIndex: 1 }}
        >
          <span>🚀 New: 2025/26 Tariffs!</span>
        </div>
      </div>
    </section>
  );
}
