import { recipes } from "@/data/recipes";
import { notFound } from "next/navigation";
import BrewTimer from "@/components/BrewTimer";
import { generateRecipeJsonLd } from "@/utils/seo";
import { Metadata } from "next";
export const runtime = "edge";

const baseUrl = "https://coffee.el2k6xjp6.com";

export async function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }));
}

type Props = {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ coffee?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return {};

  const isZh = locale === "zh-TW";
  const title = isZh
    ? `${recipe.method} 手沖咖啡食譜`
    : `${recipe.method} Brewing Recipe`;
  const description = isZh
    ? `${recipe.method} 沖煮配方：咖啡粉 ${recipe.defaultCoffee}g，水溫 ${recipe.temp}°C，粉水比 1:${recipe.ratio}。附帶計時器與步驟引導。`
    : `${recipe.method} brewing recipe: ${recipe.defaultCoffee}g coffee, ${recipe.temp}°C water, 1:${recipe.ratio} ratio. Includes step-by-step timer.`;
  const url = `${baseUrl}/${locale}/recipe/${recipe.id}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/recipe/${recipe.id}`,
        "zh-TW": `${baseUrl}/zh-TW/recipe/${recipe.id}`,
        "x-default": `${baseUrl}/en/recipe/${recipe.id}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Coffee Brew Timer",
      locale: isZh ? "zh_TW" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function RecipeDetailPage({
  params,
  searchParams,
}: Props) {
  const { id, locale } = await params;
  const { coffee } = await searchParams;

  // 1. 尋找對應的配方
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) notFound();

  const jsonLd = generateRecipeJsonLd(recipe, locale);

  // 2. 取得初始粉量（優先從 URL 拿，沒有則用預設）
  const initialCoffee = coffee ? Number(coffee) : recipe.defaultCoffee;

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 這裡我們交給 Client Component 處理複雜的計時邏輯 */}
      <BrewTimer recipe={recipe} initialCoffee={initialCoffee} />
    </main>
  );
}
