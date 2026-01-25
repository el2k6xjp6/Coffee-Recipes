import { MetadataRoute } from "next";
// 請確認這個 import路徑 是正確指向你存放 recipes 的檔案
import { recipes } from "@/data/recipes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://coffee.el2k6xjp6.com";

  // 定義你支援的語系
  const locales = ["zh-TW", "en"];

  // 1. 產生「首頁」的 Sitemap (包含多語系)
  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1, // 首頁權重最高
  }));

  // 2. 產生「食譜內頁」的 Sitemap
  // 使用 flatMap 把 (食譜 x 語系) 的所有組合展開
  const recipeEntries: MetadataRoute.Sitemap = recipes.flatMap((recipe) =>
    locales.map((locale) => ({
      // 這裡自動讀取 recipe.id (例如: god-devil-standard)
      url: `${baseUrl}/${locale}/recipe/${recipe.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8, // 內頁權重次之
    })),
  );

  // 3. 合併回傳
  return [...homeEntries, ...recipeEntries];
}
