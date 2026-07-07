import Link from 'next/link';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { ProductLinePage } from '@/lib/types';

interface ProductLineSplitProps {
  locale: Locale;
  lines: ProductLinePage[];
}

const LINE_PRESENTATION: Record<string, { route: string; badgeClass: string; icon: JSX.Element }> = {
  'acutis-centre': {
    route: 'centre',
    badgeClass: 'bg-blue-600',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14M14 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v17M4 21h16M8 9h.01M8 13h.01M8 17h.01" />
      </svg>
    ),
  },
  'acutis-community': {
    route: 'community',
    badgeClass: 'bg-teal-600',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 8.6c0 4.4-8.8 10.4-8.8 10.4S3.2 13 3.2 8.6a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z" />
      </svg>
    ),
  },
  'acutis-practitioner': {
    route: 'practitioner',
    badgeClass: 'bg-violet-600',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="m22 8-6 4 6 4V8Z" />
      </svg>
    ),
  },
};

export default function ProductLineSplit({ locale, lines }: ProductLineSplitProps) {
  if (!lines.length) return null;

  return (
    <section className="border-b border-surface-border section-pad">
      <div className="container-site">
        <div className="max-w-3xl mb-10">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
            {locale === 'ie' ? 'Trí líne táirge' : 'Three product lines'}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
            {locale === 'ie' ? 'Cúram cónaithe, pobail agus príobháideach, ceangailte' : 'Residential, public community, and private practice, connected'}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {lines.map((line) => {
            const presentation = LINE_PRESENTATION[line.slug?.current ?? ''];
            return (
              <div key={line._id} className="flex flex-col rounded-lg border border-surface-border bg-surface-base p-8">
                {presentation && (
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-white mb-5 ${presentation.badgeClass}`}>
                    {presentation.icon}
                  </span>
                )}
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted">
                  {t(line.title, locale)}
                </p>
                <h3 className="mt-2 font-serif text-xl text-primary-800 leading-snug">
                  {t(line.heroStatement, locale)}
                </h3>
                {line.overview && (
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{t(line.overview, locale)}</p>
                )}
                <Link
                  href={`/${locale}/${presentation?.route ?? 'centre'}`}
                  className="mt-6 inline-flex w-fit items-center text-sm font-medium text-primary-700 hover:text-primary-900"
                >
                  {t(line.ctaLabel, locale) || (locale === 'ie' ? 'Foghlaim Tuilleadh' : 'Learn More')} →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
