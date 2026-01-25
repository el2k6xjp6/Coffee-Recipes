import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/config";
import "../globals.css";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Metadata, Viewport } from "next"; // 1. 引入型別

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 2. 新增 Viewport 設定 (Next.js 14+ 建議做法)
 * 把 theme-color 從 metadata 獨立出來
 */
export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // 如果不希望使用者縮放 (對 App 體驗較好)
};

/**
 * generateMetadata - 產生 i18n 頁面 metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://coffee.el2k6xjp6.com";

  return {
    title: locale === "zh-TW" ? "手沖咖啡計時器" : "Coffee Brew Timer",
    description: "Your open-source coffee brewing companion",
    metadataBase: new URL(baseUrl),
    alternates: {
      // 這告訴 Google：不同語言版本的對應關係
      languages: {
        en: "/en",
        "zh-TW": "/zh-TW",
      },
      // 這告訴 Google：這個頁面的標準網址就是它自己 (避免被當作重複內容)
      canonical: `/${locale}`,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Coffee Timer",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <LocaleSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
