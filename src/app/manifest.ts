import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Coffee Timer',
    short_name: 'CoffeeTimer',
    description: 'Your open-source coffee brewing companion.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#fafafa',
    lang: 'en',
    icons: [
      {
        src: '/icon-192.png', // 確保 public 資料夾裡有這張圖
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png', // 確保 public 資料夾裡有這張圖
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}