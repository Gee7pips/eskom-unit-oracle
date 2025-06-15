
import React from "react";
import { provinceTariffs } from "@/data/provinces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const provinceColors: Record<string, string> = {
  "Gauteng": "from-sky-300 via-blue-600 to-gray-200",
  "Western Cape": "from-fuchsia-200 via-green-200 to-cyan-200",
  "KwaZulu-Natal": "from-green-100 via-emerald-400 to-green-900",
  "Eastern Cape": "from-yellow-100 via-lime-300 to-green-100",
  "Free State": "from-gray-300 via-amber-200 to-orange-200",
  "North West": "from-amber-100 via-yellow-400 to-orange-400",
  "Limpopo": "from-emerald-300 via-yellow-200 to-amber-100",
  "Mpumalanga": "from-pink-200 via-red-300 to-yellow-100",
  "Northern Cape": "from-gray-100 via-yellow-200 to-yellow-600",
};

export default function ProvinceTariffsCarousel() {
  const provinces = Object.keys(provinceTariffs);

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-5 text-center tracking-tight animate-fade-in">
        Provincial Tariff Guide (2025/26)
      </h2>
      <Carousel className="relative w-full max-w-3xl mx-auto animate-fade-in">
        <CarouselPrevious />
        <CarouselNext />
        <CarouselContent>
          {provinces.map((province) => (
            <CarouselItem key={province} className="pb-4">
              <ProvinceTariffsCard
                province={province}
                tariffs={provinceTariffs[province]}
                color={provinceColors[province] || "from-slate-300 to-blue-100"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="text-xs text-center opacity-70 mt-2">Scroll or swipe to explore more provinces.</div>
    </div>
  );
}

function ProvinceTariffsCard({
  province,
  tariffs,
  color,
}: {
  province: string;
  tariffs: {
    name: string;
    tariff_type: string;
    customer_type: string;
    description: string;
    eligibility: string;
    tariffKey?: string;
  }[];
  color: string;
}) {
  return (
    <Card className={`w-full md:w-[560px] mx-auto border-0 shadow-xl rounded-2xl bg-gradient-to-br ${color}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-primary font-bold text-2xl flex items-center gap-2">
          <span className="text-3xl">📍</span>
          {province}
        </CardTitle>
        <CardDescription className="text-base font-medium mt-1">
          Key electricity tariffs in {province}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {tariffs.map((t) => (
          <div
            key={t.name}
            className="bg-white/60 dark:bg-black/20 rounded-xl p-3 shadow-sm animate-fade-in flex flex-col"
          >
            <div className="flex items-center gap-2 text-md font-bold mb-1">
              <span>
                {t.tariff_type === "Inclining Block" && "🔼"}
                {t.tariff_type === "Time of Use (TOU)" && "⏱️"}
                {t.tariff_type?.toLowerCase().includes("flat") && "💰"}
                {t.tariff_type === "TOU" && "⏱️"}
                {t.tariff_type?.toLowerCase().includes("seasonal") && "🌤️"}
              </span>
              {t.name}
            </div>
            <div className="flex flex-col font-italic text-[14px] mb-1 opacity-80">{t.customer_type}</div>
            <div className="text-[15px] mb-1 font-medium">{t.description}</div>
            <div className="text-[13px] mb-1 font-semibold">
              Eligibility: <span className="font-normal">{t.eligibility}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
