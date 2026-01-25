
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from './config';

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