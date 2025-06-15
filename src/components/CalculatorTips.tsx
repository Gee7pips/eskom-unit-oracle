
import React from "react";

const tips = [
  {
    icon: "💡",
    title: "Tip: Compare Tariffs",
    description: "Provincial tariffs and plans change often—use the calculator with different settings to find the best one for your usage.",
  },
  {
    icon: "🏷️",
    title: "Tip: Watch Out for Fixed Charges",
    description: "Choosing a plan with high monthly fees may not be worth it unless your monthly usage is high.",
  },
  {
    icon: "🌙",
    title: "Tip: Off-Peak Savings",
    description: "TOU tariffs may offer big savings if you use most power at night or on weekends.",
  },
  {
    icon: "🔌",
    title: "Tip: Know Your Demand",
    description: "If you're on a business tariff, enter your 'Notified Maximum Demand' for most accurate results.",
  },
];

export default function CalculatorTips() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-white/80 to-green-100/80 dark:from-blue-900/50 dark:to-green-900/20 shadow-lg p-5">
      <h2 className="text-xl md:text-2xl font-playfair font-bold text-primary mb-2 flex items-center gap-2">
        ⚡️ How to Save More on Electricity
      </h2>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="text-3xl">{tip.icon}</span>
            <div>
              <div className="font-semibold text-primary">{tip.title}</div>
              <div className="text-muted-foreground text-[15px]">{tip.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
