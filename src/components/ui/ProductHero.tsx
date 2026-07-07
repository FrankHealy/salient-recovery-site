import Link from 'next/link';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { HomepageSettings } from '@/lib/types';

interface ProductHeroProps {
  locale: Locale;
  content: HomepageSettings;
}

export default function ProductHero({ locale, content }: ProductHeroProps) {
  const headline = t(content.heroHeadline, locale) || (locale === 'ie' ? 'Bogearraí oibríochta do sheirbhísí athshlánaithe' : 'Operational software for addiction recovery services');
  const subheadline = t(content.heroSubheadline, locale) || (locale === 'ie'
    ? 'Cuidíonn Acutis le hiontrálacha, cónaitheoirí, sreafaí cliniciúla, teagmhais, measúnuithe, sceidealú agus iar-chúram a bhainistiú ó ardán slán aonair.'
    : 'Acutis helps treatment centres and community services manage admissions, residents, clinical workflows, incidents, assessments, scheduling and aftercare from a single secure platform.');
  const primaryLabel = t(content.primaryCtaLabel, locale) || (locale === 'ie' ? 'Leabhair Taispeántais' : 'Book Demo');
  const secondaryLabel = t(content.secondaryCtaLabel, locale) || (locale === 'ie' ? 'Féach ar an Ardán' : 'Explore Platform');

  return (
    <section className="border-b border-surface-border bg-surface-base">
      <div className="container-site py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-5">
            {locale === 'ie' ? 'Acutis' : 'Acutis'}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-primary-900 leading-tight">
            {headline}
          </h1>
          <p className="mt-6 text-lg text-ink-secondary leading-relaxed max-w-prose-tight">
            {subheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={content.primaryCtaLink || `/${locale}/contact`}
              className="inline-flex items-center px-5 py-2.5 bg-primary-800 text-ink-inverse text-sm font-medium rounded hover:bg-primary-700 transition-colors duration-200"
            >
              {primaryLabel}
            </Link>
            <Link
              href={content.secondaryCtaLink || `/${locale}/platform`}
              className="inline-flex items-center px-5 py-2.5 border border-primary-700 text-primary-700 text-sm font-medium rounded hover:bg-primary-50 transition-colors duration-200"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
