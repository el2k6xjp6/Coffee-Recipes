import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "next-pwa"; // 這裡通常建議重新命名避免混淆

const withNextIntl = createNextIntlPlugin();

// 1. 初始化 PWA 設定 (TypeScript 下這樣寫比較穩)
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  // 如果你需要 disable 開發環境的 PWA，可以在這裡加 disable: process.env.NODE_ENV === 'development'
});

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

// 2. 明確指定型別 : NextConfig
const nextConfig: NextConfig = {
  // PWA 設定已經移到上面的 withPWAInit 裡了，這裡不需要再寫 pwa: {}

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

// 3. 組合匯出
export default withNextIntl(withPWA(nextConfig));
