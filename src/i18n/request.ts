import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// 建議將定義抽離至 config.ts，但若留在這請確保 middleware 不會引用此檔案
export const locales = ['en', 'zh-TW'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. 取得 locale 並等待其解析 (Unwrap Promise)
  const locale = await requestLocale;

  // 2. 驗證合法性
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale: locale as Locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});