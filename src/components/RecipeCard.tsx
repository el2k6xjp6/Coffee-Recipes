"use client";

import { useState } from "react";
import type { Recipe } from "@/types/recipes";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  const router = useRouter();
  const tCommon = useTranslations("common");
  const tRecipe = useTranslations();

  const [coffeeWeight, setCoffeeWeight] = useState(recipe.defaultCoffee);
  const totalWater = Math.round(coffeeWeight * recipe.ratio);

  const handleStart = () => {
    router.push({
      pathname: `/recipe/${recipe.id}`,
      query: { coffee: coffeeWeight },
    });
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
      <div className="mb-4 h-30">
        <span className="mb-2 inline-block rounded-md bg-orange-50 px-2 py-1 text-[10px] font-black text-orange-600 uppercase">
          {recipe.method}
        </span>
        <h3 className="line-clamp-2 text-2xl leading-tight font-black text-zinc-900">
          {tRecipe(recipe.nameKey)}
        </h3>
        <p className="mt-1 text-xs font-bold text-zinc-400">
          by {recipe.author}
        </p>
      </div>

      {/* 2. 參數網格區：固定高度 */}
      <div className="grid h-25 grid-cols-3 items-center gap-2 border-y border-zinc-100 py-6">
        <div className="text-center">
          <p className="mb-1 text-[10px] font-bold tracking-tighter text-zinc-400 uppercase">
            {tCommon("temp")}
          </p>
          <p className="text-lg font-black text-zinc-900">{recipe.temp}°C</p>
        </div>
        <div className="flex h-full flex-col justify-center border-x border-zinc-100 text-center">
          <p className="mb-1 text-[10px] font-bold tracking-tighter text-zinc-400 uppercase">
            {tCommon("grind")}
          </p>
          <p className="text-sm leading-none font-black text-zinc-900">
            {recipe.grindSize}
          </p>
        </div>
        <div className="text-center">
          <p className="mb-1 text-[10px] font-bold tracking-tighter text-zinc-400 uppercase">
            {tCommon("ratio")}
          </p>
          <p className="text-lg font-black text-zinc-900">1:{recipe.ratio}</p>
        </div>
      </div>

      {/* 3. 粉量調整器：使用 flex-grow 佔據剩餘空間，確保它垂直置中 */}
      <div className="flex grow flex-col justify-center py-6">
        <div className="flex items-center justify-between rounded-2xl bg-zinc-50 p-4">
          {/* 左側粉量輸入 */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">
              {tCommon("coffee")}
            </span>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={coffeeWeight}
                onChange={(e) => setCoffeeWeight(Number(e.target.value))}
                className="w-10 bg-transparent text-xl font-black text-zinc-900 focus:outline-none"
              />
              <span className="text-sm font-bold text-zinc-400">g</span>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-200" />

          {/* 右側水量顯示 */}
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">
              {tCommon("water")}
            </span>
            <p className="text-xl font-black text-orange-600">
              {totalWater}
              <span className="ml-1 text-sm font-bold text-zinc-400">ml</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. 按鈕區：mt-auto 確保按鈕永遠在最下方且水平對齊 */}
      <div className="mt-auto">
        <button
          onClick={handleStart}
          className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-black tracking-widest text-white uppercase transition-transform active:scale-95"
        >
          {tCommon("start_brew")}
        </button>
      </div>
    </div>
  );
}
