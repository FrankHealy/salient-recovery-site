// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';
import { client } from '@/lib/sanity/client';
import { SITE_SETTINGS_QUERY, NAV_ITEMS_QUERY } from '@/lib/sanity/queries';
import type { SiteSettings, NavItem } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

// Locale routes are refreshed from Sanity at most one minute after a
// published content change is requested by a visitor.
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const settings: SiteSettings | null = await client.fetch(SITE_SETTINGS_QUERY);
  return {
    title: {
      default: settings?.siteName?.en ?? 'Salient Recovery',
      template: `%s — ${settings?.siteName?.en ?? 'Salient Recovery'}`,
    },
    description: settings?.siteTagline?.en ?? 'Clinical operations platform for regulated recovery services.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://salientrecovery.com'),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const [settings, navItems]: [SiteSettings | null, NavItem[]] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(NAV_ITEMS_QUERY),
  ]);

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-dvh bg-surface-base text-ink-primary antialiased">
        <Header navItems={navItems} locale={locale as import('@/lib/i18n').Locale} settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer navItems={navItems} settings={settings} locale={locale as import('@/lib/i18n').Locale} />
      </body>
    </html>
  );
}
