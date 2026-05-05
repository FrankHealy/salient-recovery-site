// src/lib/i18n.ts

export const LOCALES = ['en', 'ie'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/**
 * Resolve a locale string from Sanity's locale object.
 * Falls back gracefully: requested locale → default locale → first available value.
 */
export function t(
  obj: Partial<Record<Locale, string | null | undefined>> | null | undefined,
  locale: Locale
): string {
  if (!obj) return '';
  return obj[locale] ?? obj[DEFAULT_LOCALE] ?? Object.values(obj).find(Boolean) ?? '';
}

/**
 * Same as t() but for portable text / block content arrays.
 */
export function tBlock(
  obj: Partial<Record<Locale, unknown[] | null | undefined>> | null | undefined,
  locale: Locale
): unknown[] {
  if (!obj) return [];
  return (obj[locale] ?? obj[DEFAULT_LOCALE] ?? []) as unknown[];
}

export function getLocalePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean}`;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ie: 'Gaeilge',
};
