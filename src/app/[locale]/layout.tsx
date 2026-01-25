import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/request"; // 確保路徑正確
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

type Props = {
  params: Promise<{ locale: string }>;
};
// 注意：在 App Router 中，i18n 頁面的 metadata 建議改用 generateMetadata
export async function generateMetadata({ params }: Props) {
  // 關鍵點：必須先 await params
  const { locale } = await params;

  return {
    title: locale === "zh-TW" ? "手沖咖啡計時器" : "Coffee Brew Timer",
    description: "Your open-source coffee brewing companion",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Next.js 15 建議使用 Promise
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
