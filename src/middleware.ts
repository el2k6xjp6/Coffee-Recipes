import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale
});

export const config = {
  // 排除掉不需經過語系轉向的檔案
  matcher: ['/', '/(zh-TW|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};