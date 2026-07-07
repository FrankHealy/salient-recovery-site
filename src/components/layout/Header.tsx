// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { NavItem, SiteSettings } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LocaleSwitch from '@/components/content/LocaleSwitch';

interface Props {
  navItems: NavItem[];
  locale: Locale;
  settings: SiteSettings | null;
}

export default function Header({ navItems, locale, settings }: Props) {
  const [open, setOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const pathname = usePathname();

  const siteName = t(settings?.siteName, locale) || 'Salient Recovery';

  const isActive = (href: string) => {
    const localePrefixed = `/${locale}${href}`;
    return pathname === localePrefixed || pathname.startsWith(`${localePrefixed}/`);
  };

  // Contact already has its own dedicated CTA button — don't duplicate it as a flat nav link.
  const primaryNavItems = navItems.filter((item) => item.href !== '/contact');

  return (
    <header className="border-b border-surface-border bg-surface-base/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Wordmark */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <Image
              src="/salient-recovery-logo.svg"
              alt={siteName}
              width={220}
              height={56}
              priority
              className="h-9 w-auto sm:h-10"
            />
            <span className="sr-only">{siteName}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 min-w-0" aria-label="Main navigation">
            {primaryNavItems.map((item) => (
              item.children && item.children.length > 0 ? (
                <div key={item._id} className="relative group">
                  <Link
                    href={`/${locale}${item.href}`}
                    className={`
                      inline-flex items-center gap-1 px-2 py-1.5 text-sm font-sans font-medium rounded whitespace-nowrap transition-colors duration-200
                      ${isActive(item.href)
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-raised'}
                    `}
                  >
                    {t(item.label, locale)}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <div
                    className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded border border-surface-border
                               bg-surface-base py-2 opacity-0 shadow-md transition-[opacity,visibility] duration-150
                               group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={`/${locale}${child.href}`}
                        className="block px-4 py-2 text-sm text-ink-secondary hover:bg-surface-raised hover:text-ink-primary transition-colors"
                      >
                        {t(child.label, locale)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item._id}
                  href={`/${locale}${item.href}`}
                  className={`
                    px-2 py-1.5 text-sm font-sans font-medium rounded whitespace-nowrap transition-colors duration-200
                    ${isActive(item.href)
                      ? 'text-primary-800 bg-primary-50'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-raised'}
                  `}
                >
                  {t(item.label, locale)}
                </Link>
              )
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 shrink-0">
            <LocaleSwitch currentLocale={locale} />

            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center text-sm font-medium font-sans
                         border border-primary-700 text-primary-700 rounded px-3 py-1.5
                         hover:bg-primary-700 hover:text-ink-inverse transition-colors duration-200"
            >
              {locale === 'ie' ? 'Déan Teagmháil' : 'Contact'}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-ink-secondary hover:text-ink-primary"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 5h14M3 10h14M3 15h14" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-surface-border bg-surface-base">
          <div className="container-site py-4 flex flex-col gap-1">
            {primaryNavItems.map((item) => (
              <div key={item._id}>
                <div className="flex items-center">
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpen(false)}
                    className={`
                      flex-1 px-3 py-2.5 text-sm font-medium rounded
                      ${isActive(item.href)
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-raised'}
                    `}
                  >
                    {t(item.label, locale)}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <button
                      onClick={() => setOpenMobileItem(openMobileItem === item._id ? null : item._id)}
                      className="p-2.5 text-ink-secondary"
                      aria-label={locale === 'ie' ? 'Leathnaigh' : 'Expand'}
                      aria-expanded={openMobileItem === item._id}
                    >
                      <svg
                        width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true"
                        className={`transition-transform ${openMobileItem === item._id ? 'rotate-180' : ''}`}
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && item.children.length > 0 && openMobileItem === item._id && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-surface-border pl-3 py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={`/${locale}${child.href}`}
                        onClick={() => setOpen(false)}
                        className="px-3 py-2 text-sm text-ink-secondary hover:text-ink-primary rounded hover:bg-surface-raised"
                      >
                        {t(child.label, locale)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-surface-border">
              <Link
                href={`/${locale}/contact`}
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-medium border border-primary-700 text-primary-700
                           rounded px-3 py-2 hover:bg-primary-700 hover:text-ink-inverse transition-colors duration-200"
              >
                {locale === 'ie' ? 'Déan Teagmháil' : 'Contact'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
