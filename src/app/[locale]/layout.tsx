import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/config";
import "../globals.css";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * generateMetadata - 產生 i18n 頁面 metadata
 * @param params Promise<{ locale: string }>
 * @returns metadata 物件
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 關鍵點：必須先 await params（Next.js 15 新寫法）
  const { locale } = await params;
  return {
    title: locale === "zh-TW" ? "手沖咖啡計時器" : "Coffee Brew Timer",
    description: "Your open-source coffee brewing companion",
  };
}

/**
 * LocaleLayout - i18n layout 元件
 * @param children ReactNode
 * @param params Promise<{ locale: string }>
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 驗證語系是否在允許清單內
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 獲取該語系的翻譯字典
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
