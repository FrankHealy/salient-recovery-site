// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { NavItem, SiteSettings } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t, LOCALE_LABELS, LOCALES } from '@/lib/i18n';
import LocaleSwitch from '@/components/content/LocaleSwitch';

interface Props {
  navItems: NavItem[];
  locale: Locale;
  settings: SiteSettings | null;
}

export default function Header({ navItems, locale, settings }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const siteName = t(settings?.siteName, locale) || 'Salient Recovery';

  const isActive = (href: string) => {
    const localePrefixed = `/${locale}${href}`;
    return pathname === localePrefixed || pathname.startsWith(`${localePrefixed}/`);
  };

  return (
    <header className="border-b border-surface-border bg-surface-base/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container-site">
        <div className="flex items-center justify-between h-16">

          {/* Wordmark */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/salient-recovery-logo.svg"
              alt={siteName}
              width={220}
              height={56}
              priority
              className="h-10 w-auto sm:h-11"
            />
            <span className="sr-only">{siteName}</span>
            <span
              className="hidden sm:inline-block font-mono text-2xs text-ink-muted uppercase tracking-widest leading-none
                         border border-surface-border rounded px-1 py-0.5 group-hover:border-primary-300 transition-colors duration-200"
            >
              Platform
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item._id}
                href={`/${locale}${item.href}`}
                className={`
                  px-3 py-1.5 text-sm font-sans font-medium rounded transition-colors duration-200
                  ${isActive(item.href)
                    ? 'text-primary-800 bg-primary-50'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-raised'}
                `}
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
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
            {navItems.map((item) => (
              <Link
                key={item._id}
                href={`/${locale}${item.href}`}
                onClick={() => setOpen(false)}
                className={`
                  px-3 py-2.5 text-sm font-medium rounded
                  ${isActive(item.href)
                    ? 'text-primary-800 bg-primary-50'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-raised'}
                `}
              >
                {t(item.label, locale)}
              </Link>
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
