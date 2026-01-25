import { recipes } from "@/data/recipes";
import { notFound } from "next/navigation";
import BrewTimer from "@/components/BrewTimer";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ coffee?: string }>;
};

export default async function RecipeDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { coffee } = await searchParams;

  // 1. 尋找對應的配方
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) notFound();

  // 2. 取得初始粉量（優先從 URL 拿，沒有則用預設）
  const initialCoffee = coffee ? Number(coffee) : recipe.defaultCoffee;

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      {/* 這裡我們交給 Client Component 處理複雜的計時邏輯 */}
      <BrewTimer recipe={recipe} initialCoffee={initialCoffee} />
    </main>
  );
}
