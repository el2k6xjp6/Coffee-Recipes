import { createNavigation } from 'next-intl/navigation';
import { locales } from './config'; // 確保你的 locales 定義在這裡

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({ locales });