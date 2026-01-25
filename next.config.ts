import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

// 定義 CSP 策略 (這行最長，拉出來寫比較整齊)
// 注意：如果你有接其他的 API 或圖片，可能要加在 connect-src 或 img-src
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 原有的 PWA 設定
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },

  // 新增：安全性標頭 (Security Headers)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''), // 去除換行，變成一行
          },
        ],
      },
    ]
  },
};

// 保持原有的 export 結構
export default withNextIntl(withPWA(nextConfig));