// src/app/[locale]/page.tsx
import { client } from '@/lib/sanity/client';
import { HOMEPAGE_SETTINGS_QUERY } from '@/lib/sanity/queries';
import { PRODUCT_LINE_PAGES_QUERY } from '@/lib/sanity/homepage';
import type { HomepageSettings, ProductLinePage } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import {
  ProductHero,
  HeroCarousel,
  JourneyStrip,
  ProductShowcase,
  ProductLineSplit,
  ProductModuleGrid,
  ProblemCards,
  Differentiators,
  ProductMaturity,
  SiteCTA,
} from '@/components/ui';

interface Props {
  params: { locale: Locale };
}

export default async function HomePage({ params: { locale } }: Props) {
  const [homepage, productLines]: [HomepageSettings | null, ProductLinePage[]] = await Promise.all([
    client.fetch(HOMEPAGE_SETTINGS_QUERY),
    client.fetch(PRODUCT_LINE_PAGES_QUERY),
  ]);
  const homepageContent = homepage ?? ({ _id: 'fallback-homepage' } as HomepageSettings);

  const screenshots = homepageContent.screenshotCarousel ?? [];
  const modules = homepageContent.productModules ?? [];
  const problemCards = homepageContent.problemCards ?? [];
  const differentiators = homepageContent.differentiators ?? [];
  const maturityPoints = homepageContent.maturityPoints ?? [];

  return (
    <>
      <ProductHero locale={locale} content={homepageContent} />
      <section className="border-b border-surface-border section-pad">
        <div className="container-site">
          <HeroCarousel locale={locale} slides={screenshots} />
        </div>
      </section>
      <JourneyStrip locale={locale} />
      <ProductShowcase locale={locale} modules={modules} />
      <ProductLineSplit locale={locale} lines={productLines} />
      <ProblemCards locale={locale} cards={problemCards} />
      <section className="border-b border-surface-border section-pad">
        <div className="container-site">
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'Modúil' : 'Modules'}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
              {locale === 'ie' ? 'Ábhair oibríochtúla Acutis' : 'Acutis product modules'}
            </h2>
            <p className="mt-3 text-base text-ink-secondary leading-relaxed">
              {locale === 'ie'
                ? 'Deartha le sreafaí cónaitheacha, cliniciúla agus pobail i gcuimhne, ag tacaíocht do bhaill foirne agus bainisteoirí araon.'
                : 'Designed with residential, clinical and community workflows in mind, supporting both staff and managers across the service.'}
            </p>
          </div>
          <ProductModuleGrid locale={locale} modules={modules} />
        </div>
      </section>
      <Differentiators locale={locale} items={differentiators} />
      <ProductMaturity locale={locale} points={maturityPoints} />
      <SiteCTA locale={locale} content={homepageContent} />
    </>
  );
}
