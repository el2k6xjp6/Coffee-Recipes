// src/components/LocaleSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "zh-TW" : "en";

    // 使用 next-intl 的 router 來確保路徑正確轉換
    // @ts-expect-error params 類型轉換
    router.replace({ pathname, params }, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 
                 bg-white/80 backdrop-blur-md border border-zinc-200 
                 rounded-full shadow-sm hover:shadow-md transition-all 
                 active:scale-95 group">
      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-zinc-100 group-hover:bg-orange-100 transition-colors">
        <span className="text-[10px] font-bold text-zinc-600 group-hover:text-orange-600">
          {locale === "en" ? "EN" : "中"}
        </span>
      </div>
      <span className="text-xs font-bold text-zinc-900 tracking-tight">
        {locale === "en" ? "English" : "繁體中文"}
      </span>
    </button>
  );
}
