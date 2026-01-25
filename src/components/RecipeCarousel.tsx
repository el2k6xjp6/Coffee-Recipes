"use client";

import { useState, useRef } from "react";
import type { Recipe } from "@/types/recipes";
import RecipeCard from "./RecipeCard";
import ScrollIndicator from "./ScrollIndicator";

const CARD_WIDTH_DESKTOP = "400px";
export default function RecipeCarousel({ recipes }: { recipes: Recipe[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, offsetWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (offsetWidth * 0.85));

    if (index !== activeIndex && index >= 0 && index < recipes.length) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative w-full">
      {/* 捲動容器 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        /* 📱 手機版：(100vw - 76vw) / 2 = 12vw */ /* 💻 桌機版重點：使用 calc 動態計算 Padding */ /* Padding = (50% 螢幕寬度) - (一半的卡片寬度) */
        className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[12vw] md:px-[calc(50%-200px)]`}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            /* 📱 手機寬度 */ /* 💻 桌機寬度 (固定 400px，要跟上面的 padding 計算對應) */
            className={`min-w-[76vw] shrink-0 snap-center md:min-w-[${CARD_WIDTH_DESKTOP}]`}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      {/* 漸層遮罩 */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[10vw] bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[10vw] bg-gradient-to-l from-zinc-950 to-transparent" />

      {/* 進度指標點 */}
      <ScrollIndicator count={recipes.length} activeIndex={activeIndex} />
    </section>
  );
}
