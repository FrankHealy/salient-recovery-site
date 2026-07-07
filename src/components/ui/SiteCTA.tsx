import Link from 'next/link';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { HomepageSettings } from '@/lib/types';

interface SiteCTAProps {
  locale: Locale;
  content: HomepageSettings;
}

export default function SiteCTA({ locale, content }: SiteCTAProps) {
  const headline = t(content.ctaHeadline, locale) || (locale === 'ie' ? 'Feic Acutis in úsáid' : 'See Acutis in practice');
  const text = t(content.ctaText, locale) || (locale === 'ie' ? 'Iarr turas treoraithe tríd an ardán.' : 'Request a guided walkthrough of the platform.');
  const email = content.ctaEmail || 'enquiries@salientrecovery.com';
  const label = t(content.primaryCtaLabel, locale) || (locale === 'ie' ? 'Leabhair Taispeántais' : 'Book Demo');

  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="rounded border border-surface-border bg-surface-raised p-8 md:p-10">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">{locale === 'ie' ? 'An chéad chéim eile' : 'Next step'}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-primary-800">{headline}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">{text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={content.primaryCtaLink || `/${locale}/contact`}
              className="inline-flex items-center px-5 py-2.5 bg-primary-800 text-ink-inverse text-sm font-medium rounded hover:bg-primary-700 transition-colors duration-200"
            >
              {label}
            </Link>
            <a href={`mailto:${email}`} className="inline-flex items-center px-5 py-2.5 border border-surface-border text-ink-secondary text-sm font-medium rounded hover:border-primary-300 hover:text-ink-primary transition-colors duration-200">
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
