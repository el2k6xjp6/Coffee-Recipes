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
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 flex flex-col h-full">
      <div className="h-30 mb-4">
        <span className="text-[10px] font-black px-2 py-1 bg-orange-50 text-orange-600 rounded-md mb-2 inline-block uppercase">
          {recipe.method}
        </span>
        <h3 className="text-2xl font-black text-zinc-900 leading-tight line-clamp-2">
          {tRecipe(recipe.nameKey)}
        </h3>
        <p className="text-xs font-bold text-zinc-400 mt-1">
          by {recipe.author}
        </p>
      </div>

      {/* 2. 參數網格區：固定高度 */}
      <div className="grid grid-cols-3 gap-2 py-6 border-y border-zinc-100 h-25 items-center">
        <div className="text-center">
          <p className="text-[10px] text-zinc-400 font-bold mb-1 uppercase tracking-tighter">
            {tCommon("temp")}
          </p>
          <p className="text-lg font-black text-zinc-900">{recipe.temp}°C</p>
        </div>
        <div className="text-center border-x border-zinc-100 flex flex-col justify-center h-full">
          <p className="text-[10px] text-zinc-400 font-bold mb-1 uppercase tracking-tighter">
            {tCommon("grind")}
          </p>
          <p className="text-sm font-black text-zinc-900 leading-none">
            {recipe.grindSize}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-zinc-400 font-bold mb-1 uppercase tracking-tighter">
            {tCommon("ratio")}
          </p>
          <p className="text-lg font-black text-zinc-900">1:{recipe.ratio}</p>
        </div>
      </div>

      {/* 3. 粉量調整器：使用 flex-grow 佔據剩餘空間，確保它垂直置中 */}
      <div className="grow flex flex-col justify-center py-6">
        <div className="flex items-center justify-between bg-zinc-50 p-4 rounded-2xl">
          {/* 左側粉量輸入 */}
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 font-bold uppercase">
              {tCommon("coffee")}
            </span>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={coffeeWeight}
                onChange={(e) => setCoffeeWeight(Number(e.target.value))}
                className="bg-transparent font-black text-xl w-10 text-zinc-900 focus:outline-none"
              />
              <span className="text-sm font-bold text-zinc-400">g</span>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-200" />

          {/* 右側水量顯示 */}
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-zinc-400 font-bold uppercase">
              {tCommon("water")}
            </span>
            <p className="font-black text-xl text-orange-600">
              {totalWater}
              <span className="text-sm ml-1 text-zinc-400 font-bold">ml</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. 按鈕區：mt-auto 確保按鈕永遠在最下方且水平對齊 */}
      <div className="mt-auto">
        <button
          onClick={handleStart}
          className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-transform">
          {tCommon("start_brew")}
        </button>
      </div>
    </div>
  );
}
