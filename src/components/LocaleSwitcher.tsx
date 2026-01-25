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
      className="group fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md transition-all hover:shadow-md active:scale-95"
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-orange-100">
        <span className="text-[10px] font-bold text-zinc-600 group-hover:text-orange-600">
          {locale === "en" ? "EN" : "中"}
        </span>
      </div>
      <span className="text-xs font-bold tracking-tight text-zinc-900">
        {locale === "en" ? "English" : "繁體中文"}
      </span>
    </button>
  );
}
