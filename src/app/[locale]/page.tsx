import { recipes } from "@/data/recipes";
import { getTranslations } from "next-intl/server";
import { generateWebSiteJsonLd } from "@/utils/seo";
import Footer from "@/components/Footer";
import RecipeExplorer from "@/components/RecipeExplorer";
import Link from "next/link";

export const runtime = "edge";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const jsonLd = generateWebSiteJsonLd(locale);
  const t = await getTranslations("Index");
  const tRecipes = await getTranslations("recipes");

  return (
    // 1. 背景改為深色 zinc-950，並隱藏溢出避免光暈產生 scrollbar
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 新增：背景氛圍光 (與計時器頁面呼應) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950 to-zinc-950" />

      {/* 3. 內容區塊都要加 relative z-10 才能浮在光暈上面 */}
      <header className="relative z-10 px-6 pt-20 pb-8 text-center">
        <h1 className="mb-3 text-5xl font-black tracking-tighter text-white drop-shadow-xl">
          {t("title")}
        </h1>
        {/* 加個副標題增加質感，如果沒有 key 可以先寫死英文 */}
        <p className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
          {t("description")}
        </p>
      </header>

      {/* Carousel */}
      <div className="relative z-10 w-full">
        <RecipeExplorer recipes={recipes} />
      </div>

      {/* SEO: server-rendered recipe list, visually hidden but crawlable by Googlebot */}
      <nav aria-label="recipes" className="sr-only">
        <ul>
          {recipes.map((recipe) => {
            // nameKey format: "recipes.god_devil_standard.name" → strip "recipes." prefix
            const key = recipe.nameKey.replace(/^recipes\./, "") as Parameters<typeof tRecipes>[0];
            return (
              <li key={recipe.id}>
                <Link href={`/${locale}/recipe/${recipe.id}`}>
                  {tRecipes(key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Footer />
    </main>
  );
}
