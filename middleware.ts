// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from './src/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Extract first segment
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // If first segment is a valid locale, leave as-is
  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? '';
  const preferred = acceptLang
    .split(',')
    .map((lang) => lang.split(';')[0].trim().slice(0, 2))
    .find((code) => isValidLocale(code));

  const locale = preferred ?? DEFAULT_LOCALE;

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|studio|.*\\..*).*)'],
};
