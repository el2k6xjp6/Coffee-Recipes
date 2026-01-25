import { recipes } from "@/data/recipes";
import RecipeCarousel from "@/components/RecipeCarousel";
import { getTranslations } from "next-intl/server";
import { generateWebSiteJsonLd } from "@/utils/seo";
export const runtime = "edge";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const jsonLd = generateWebSiteJsonLd(locale);
  const t = await getTranslations("Index");
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#fafafa]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="px-6 py-12 text-center">
        <h1 className="mb-3 text-5xl font-black tracking-tighter text-zinc-900">
          {t("title")}
        </h1>
      </header>

      {/* 呼叫 Carousel 組件 */}
      <RecipeCarousel recipes={recipes} />

      <footer className="mt-auto py-10 text-[10px] tracking-widest text-zinc-400 uppercase">
        {t("footer")}
      </footer>
    </main>
  );
}
