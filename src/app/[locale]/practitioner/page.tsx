// src/app/[locale]/practitioner/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { PRODUCT_LINE_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import type { ProductLinePage } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero } from '@/components/ui/index';
import ProductModuleGrid from '@/components/ui/ProductModuleGrid';

interface Props {
  params: { locale: Locale };
}

export const metadata: Metadata = { title: 'Acutis Practitioner' };

export default async function PractitionerPage({ params: { locale } }: Props) {
  const line: ProductLinePage | null = await client.fetch(PRODUCT_LINE_BY_SLUG_QUERY, { slug: 'acutis-practitioner' });

  if (!line) return null;

  return (
    <>
      <PageHero
        eyebrow={t(line.title, locale)}
        heading={t(line.heroStatement, locale)}
        statement={t(line.overview, locale)}
      />
      {line.relatedModules && line.relatedModules.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'Modúil' : 'Modules'}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-primary-800 mb-8">
              {locale === 'ie' ? 'Cad atá san áireamh in Cleachtóir Acutis' : "What's included in Acutis Practitioner"}
            </h2>
            <ProductModuleGrid locale={locale} modules={line.relatedModules} />
          </div>
        </section>
      )}
    </>
  );
}
