"use client";

import { useState } from "react";
import type { Recipe } from "@/types/recipes";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import {
  Thermometer,
  Scale,
  Droplets,
  ChevronRight,
  CupSoda,
} from "lucide-react";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  const router = useRouter();
  const tCommon = useTranslations("common");
  const tMethods = useTranslations("Methods");
  const tRecipe = useTranslations();

  const [coffeeWeight, setCoffeeWeight] = useState(recipe.defaultCoffee);
  const totalWater = Math.round(coffeeWeight * recipe.ratio);

  const handleStart = () => {
    router.push({
      pathname: `/recipe/${recipe.id}`,
      query: { coffee: coffeeWeight },
    });
  };

  const isV60 = recipe.method.toLowerCase().includes("v60");
  const accentColor = isV60 ? "text-amber-500" : "text-blue-400";
  const badgeClass = isV60
    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
    : "bg-blue-500/10 text-blue-400 border-blue-500/20";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20">
      {/* 背景裝飾光暈 */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-all duration-500 group-hover:bg-amber-500/10" />

      {/* 1. 標題區 */}
      <div className="relative z-10 mb-6">
        <span
          className={`mb-3 inline-block rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${badgeClass}`}
        >
          {tMethods(recipe.method)}
        </span>

        {/* 固定高度標題區 */}
        <div className="flex h-16 items-center">
          <h3 className="line-clamp-2 text-2xl leading-tight font-black tracking-tight text-white">
            {tRecipe(recipe.nameKey)}
          </h3>
        </div>

        <p className="mt-2 text-sm font-medium text-zinc-500">
          by {recipe.author}
        </p>
      </div>

      {/* 2. 參數網格區：Grid 區域 (標題置頂、數字置底版) */}
      <div className="relative z-10 mb-6 grid h-28 grid-cols-3 border-y border-white/5">
        {/* 左：溫度 */}
        {/* 修改 1: justify-between 把內容推到上下兩端，py-5 給予邊距 */}
        <div className="flex flex-col items-center justify-between border-r border-white/5 py-5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Thermometer size={14} />
            <span className="translate-y-[1px] text-[10px] font-bold tracking-wider uppercase">
              {tCommon("temp")}
            </span>
          </div>
          {/* 修改 2: items-end 確保數字靠下對齊 */}
          <div className="flex h-10 w-full items-center justify-center">
            <p className="text-xl leading-none font-black text-white tabular-nums">
              {recipe.temp}°
            </p>
          </div>
        </div>

        {/* 中：研磨度 */}
        <div className="flex flex-col items-center justify-between border-r border-white/5 px-1 py-5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Scale size={14} />
            <span className="translate-y-[1px] text-[10px] font-bold tracking-wider uppercase">
              {tCommon("grind")}
            </span>
          </div>
          {/* items-end 讓單行文字沈底，雙行文字剛好填滿，達成視覺對齊 */}
          <div className="flex h-10 w-full items-center justify-center">
            <p className="w-full text-center text-sm leading-tight font-bold break-words text-white">
              {tRecipe(recipe.grindSize)}
            </p>
          </div>
        </div>

        {/* 右：水粉比 */}
        <div className="flex flex-col items-center justify-between py-5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Droplets size={14} />
            <span className="translate-y-[1px] text-[10px] font-bold tracking-wider uppercase">
              {tCommon("ratio")}
            </span>
          </div>
          <div className="flex h-10 w-full items-center justify-center">
            <p className="text-xl leading-none font-black text-white tabular-nums">
              1:{recipe.ratio}
            </p>
          </div>
        </div>
      </div>

      {/* 3. 粉量調整器 */}
      <div className="relative z-10 mb-8 flex grow flex-col justify-center">
        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 p-5 shadow-inner">
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
              <CupSoda size={12} />
              {/* 修改點：這裡也加一下，保持一致 */}
              <span className="translate-y-[1px]">{tCommon("coffee")}</span>
            </label>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={coffeeWeight}
                onChange={(e) => setCoffeeWeight(Number(e.target.value))}
                className="w-12 bg-transparent p-0 text-3xl font-black text-white tabular-nums focus:ring-0 focus:outline-none"
              />
              <span className="text-sm font-bold text-zinc-600">g</span>
            </div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="flex flex-col items-end gap-1">
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
              {/* 修改點：這裡也加一下 */}
              <span className="translate-y-[1px]">{tCommon("water")}</span>
              <Droplets size={12} />
            </span>
            <p className={`text-3xl font-black tabular-nums ${accentColor}`}>
              {totalWater}
              <span className="ml-1 text-sm font-bold text-zinc-600">ml</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. 按鈕區 */}
      <div className="relative z-10 mt-auto">
        <button
          onClick={handleStart}
          className="group/btn flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-black tracking-widest text-zinc-950 uppercase shadow-lg shadow-white/5 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-95"
        >
          {tCommon("start_brew")}
          <ChevronRight
            size={16}
            className="transition-transform group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}
