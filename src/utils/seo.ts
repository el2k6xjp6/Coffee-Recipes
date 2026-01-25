import { Recipe } from "@/types/recipes";

/**
 * 產生食譜的 JSON-LD 結構化資料
 * @param recipe 食譜資料物件
 * @param locale 目前語系
 * @returns Google 認得的 JSON 物件
 */
export function generateRecipeJsonLd(recipe: Recipe, locale: string) {
  const baseUrl = "https://coffee.el2k6xjp6.com";

  // 這裡回傳符合 Schema.org/Recipe 的物件
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.method, // 理想狀況這邊應該傳入翻譯後的字串
    author: {
      "@type": "Person",
      name: recipe.author,
    },
    description: "Professional coffee brewing recipe",
    recipeCategory: "Coffee",
    recipeYield: "1 cup",
    prepTime: "PT5M",
    totalTime: "PT10M",

    // 材料轉換
    recipeIngredient: [
      `${recipe.defaultCoffee}g Coffee Beans`,
      `${(recipe.defaultCoffee * recipe.ratio).toFixed(0)}g Water`, // 自動計算水量
      `${recipe.temp}°C Water`,
      `${recipe.grindSize} Grind`,
    ],

    // 步驟轉換
    recipeInstructions: recipe.steps.map((step, index) => ({
      "@type": "HowToStep",
      name: `Step ${index + 1}`,
      text: `Pour water until ${step.targetWater}g.`,
      url: `${baseUrl}/${locale}/recipe/${recipe.id}#step-${index}`,
    })),
  };
}

/**
 * 產生首頁的 JSON-LD
 * 告訴 Google 這是一個網站/應用程式
 */
export function generateWebSiteJsonLd(locale: string) {
  const baseUrl = "https://coffee.el2k6xjp6.com";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite", // 或者可以用 "SoftwareApplication" 因為你是 PWA
    name: "Coffee Brew Timer",
    url: `${baseUrl}/${locale}`,
    description: "Your open-source coffee brewing companion and timer.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
