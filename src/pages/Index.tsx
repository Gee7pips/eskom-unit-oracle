
import { EskomCalculator } from "@/components/EskomCalculator";
import HomeWelcome from "@/components/HomeWelcome";
import ProvinceTariffsCarousel from "@/components/ProvinceTariffsCarousel";
import CalculatorTips from "@/components/CalculatorTips";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 flex flex-col items-center px-2 pt-1">
      <HomeWelcome />
      <div className="w-full flex justify-center mt-4 animate-fade-in">
        <EskomCalculator />
      </div>
      <div className="w-full mt-8 animate-fade-in">
        <ProvinceTariffsCarousel />
      </div>
      <div className="w-full max-w-2xl mt-8 mb-6 animate-fade-in">
        <CalculatorTips />
      </div>
    </div>
  );
};

export default Index;
