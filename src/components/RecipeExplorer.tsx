"use client";

import { useState, useMemo } from "react";
import type { Recipe } from "@/types/recipes";
import { useTranslations } from "next-intl";
import RecipeCarousel from "@/components/RecipeCarousel";
import { Filter } from "lucide-react";

interface Props {
  recipes: Recipe[];
}

export default function RecipeExplorer({ recipes }: Props) {
  const tMethods = useTranslations("Methods");
  const tCommon = useTranslations("common"); // 假設這裡有 "all" 的翻譯

  // 1. 狀態：目前選擇的過濾器 (預設為 "ALL")
  const [selectedMethod, setSelectedMethod] = useState<string>("ALL");

  // 2. 計算：從所有食譜中提取出「不重複」的沖煮法列表
  const uniqueMethods = useMemo(() => {
    // 使用 Set 來過濾重複的 method
    const methods = Array.from(new Set(recipes.map((r) => r.method)));
    return methods.sort(); // 也可以自定義排序
  }, [recipes]);

  // 3. 計算：根據選擇的分類，篩選出要顯示的食譜
  const filteredRecipes = useMemo(() => {
    if (selectedMethod === "ALL") return recipes;
    return recipes.filter((r) => r.method === selectedMethod);
  }, [recipes, selectedMethod]);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* --- Filter Bar (可橫向捲動) --- */}
      <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-6 pb-2 md:justify-center">
        {/* 裝飾 Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-500">
          <Filter size={14} />
        </div>

        {/* "全部" 按鈕 */}
        <button
          onClick={() => setSelectedMethod("ALL")}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
            selectedMethod === "ALL"
              ? "border-white bg-white text-zinc-950"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
          }`}
        >
          {tCommon("all")}
        </button>

        {/* 各種沖煮法的按鈕 */}
        {uniqueMethods.map((method) => (
          <button
            key={method}
            onClick={() => setSelectedMethod(method)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
              selectedMethod === method
                ? "border-amber-500 bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]" // 選中時發光
                : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            {tMethods(method)}
          </button>
        ))}
      </div>

      {/* --- Carousel 顯示區 --- */}
      {/* key={selectedMethod} 很重要！切換分類時強制重置 Carousel 位置 */}
      <div
        key={selectedMethod}
        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        {filteredRecipes.length > 0 ? (
          <RecipeCarousel recipes={filteredRecipes} />
        ) : (
          // 防呆：如果該分類沒有食譜 (理論上不會發生)
          <div className="flex h-60 w-full items-center justify-center text-zinc-600">
            No recipes found.
          </div>
        )}
      </div>
    </div>
  );
}
