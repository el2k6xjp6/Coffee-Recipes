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

  const isZh = locale === "zh-TW";
  const siteName = "Coffee Brew Timer";
  const defaultTitle = isZh ? `手沖咖啡計時器 | ${siteName}` : siteName;
  const description = isZh
    ? "開源手沖咖啡計時器與食譜，支援 V60、Switch、Aeropress 等多種沖煮法。"
    : "Your open-source coffee brewing companion. Recipes and timer for V60, Switch, Aeropress, and more.";

  return {
    title: {
      default: defaultTitle,
      template: isZh ? `%s | ${siteName}` : `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        "zh-TW": `${baseUrl}/zh-TW`,
        "x-default": `${baseUrl}/zh-TW`,
      },
    },
    openGraph: {
      title: defaultTitle,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "Coffee Brew Timer",
      locale: isZh ? "zh_TW" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: defaultTitle,
      description,
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
