// src/app/[locale]/page.tsx
import { recipes } from "@/data/recipes";
import RecipeCarousel from "@/components/RecipeCarousel";

export default async function IndexPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center">
      <header className="py-12 text-center px-6">
        <h1 className="text-5xl font-black text-zinc-900 tracking-tighter mb-3">咖啡計時器</h1>
        <p className="text-zinc-500 font-medium">你的開源手沖伴侶</p>
      </header>

      {/* 呼叫 Carousel 組件 */}
      <RecipeCarousel recipes={recipes} />

      <footer className="mt-auto py-10 text-zinc-400 text-[10px] tracking-widest uppercase">
        Coffee Timer
      </footer>
    </main>
  );
}