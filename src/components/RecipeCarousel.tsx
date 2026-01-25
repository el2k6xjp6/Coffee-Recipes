"use client";

import { useState, useRef } from "react";
import type { Recipe } from "@/types/recipes";
import RecipeCard from "./RecipeCard";
import ScrollIndicator from "./ScrollIndicator";

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
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[12vw] pt-4 pb-12"
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="min-w-[76vw] snap-center md:min-w-100"
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
        {/* 最後留白，讓最後一張卡片能完美置中 */}
        <div className="min-w-[12vw] shrink-0" />
      </div>

      {/* 左右漸層遮罩 */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[15vw] bg-linear-to-r from-[#fafafa] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[15vw] bg-linear-to-l from-[#fafafa] to-transparent" />

      {/* 進度指標點 */}
      <ScrollIndicator count={recipes.length} activeIndex={activeIndex} />
    </section>
  );
}
