// src/app/[locale]/modules/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { MODULE_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import type { ProductModule, PlatformFeature } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, FeatureBlock } from '@/components/ui/index';
import ModuleWorkflowSteps from '@/components/ui/ModuleWorkflowSteps';
import ProductModuleGrid from '@/components/ui/ProductModuleGrid';

const FUNCTIONAL_SLUGS = [
  'admissions', 'residents', 'clinical-assessments', 'group-therapy', 'incident-management',
  'timeline', 'care-planning', 'community-services', 'reports',
];

interface Props {
  params: { locale: Locale; slug: string };
}

interface ModuleDetail extends ProductModule {
  capabilities?: PlatformFeature[];
}

export function generateStaticParams() {
  return FUNCTIONAL_SLUGS.map((slug) => ({ slug }));
}

export const metadata: Metadata = { title: 'Module' };

export default async function ModulePage({ params: { locale, slug } }: Props) {
  const moduleDoc: ModuleDetail | null = await client.fetch(MODULE_BY_SLUG_QUERY, { slug });
  if (!moduleDoc) notFound();

  const heroImageUrl = moduleDoc.heroScreenshot && 'image' in moduleDoc.heroScreenshot
    ? moduleDoc.heroScreenshot.image?.asset?.url
    : undefined;
  const heroAlt = moduleDoc.heroScreenshot && 'alt' in moduleDoc.heroScreenshot
    ? t(moduleDoc.heroScreenshot.alt, locale)
    : t(moduleDoc.title, locale);

  const typicalWorkflow = moduleDoc.typicalWorkflow?.[locale] ?? moduleDoc.typicalWorkflow?.en ?? [];

  return (
    <>
      <PageHero
        eyebrow={`${locale === 'ie' ? 'Modúil' : 'Modules'} / ${t(moduleDoc.title, locale)}`}
        heading={t(moduleDoc.title, locale)}
        statement={t(moduleDoc.businessOverview, locale) || t(moduleDoc.summary, locale)}
      >
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center px-5 py-2.5 bg-primary-800 text-ink-inverse text-sm font-medium rounded hover:bg-primary-700 transition-colors duration-200"
        >
          {locale === 'ie' ? 'Leabhair Taispeántas' : 'Book Demo'}
        </Link>
      </PageHero>

      {heroImageUrl && (
        <section className="border-b border-surface-border section-pad">
          <div className="container-site">
            <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-raised shadow-sm">
              <div className="flex items-center gap-1.5 border-b border-surface-border bg-surface-base px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-surface-border" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-surface-border" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-surface-border" aria-hidden="true" />
              </div>
              <img src={heroImageUrl} alt={heroAlt} className="w-full object-cover object-top" />
            </div>
          </div>
        </section>
      )}

      {moduleDoc.capabilities && moduleDoc.capabilities.length > 0 && (
        <section className="border-b border-surface-border section-pad">
          <div className="container-site">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'Cumais oibríochtúla' : 'Key operational capabilities'}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-primary-800 mb-8">
              {locale === 'ie' ? 'Cad is féidir a dhéanamh' : 'What you can do'}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {moduleDoc.capabilities.map((feature) => (
                <FeatureBlock
                  key={feature._id}
                  entity={t(feature.title, locale)}
                  title={t(feature.businessValueSummary, locale)}
                  description={t(feature.shortDescription, locale)}
                  capabilities={(feature.capabilities ?? []).map((c) => t(c.label, locale))}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {typicalWorkflow.length > 0 && (
        <section className="border-b border-surface-border section-pad bg-surface-raised">
          <div className="container-site">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'Sreabhadh oibre tipiciúil' : 'Typical workflow'}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-primary-800 mb-8">
              {locale === 'ie' ? 'Conas a oibríonn sé i gcleachtas' : 'How it works in practice'}
            </h2>
            <ModuleWorkflowSteps steps={typicalWorkflow} />
          </div>
        </section>
      )}

      {moduleDoc.relatedModules && moduleDoc.relatedModules.length > 0 && (
        <section className="border-b border-surface-border section-pad">
          <div className="container-site">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'Modúil ghaolmhara' : 'Related modules'}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-primary-800 mb-8">
              {locale === 'ie' ? 'Oibríonn siad seo le chéile' : 'These work together'}
            </h2>
            <ProductModuleGrid locale={locale} modules={moduleDoc.relatedModules} />
          </div>
        </section>
      )}

      {moduleDoc.usesPlatformCapabilities && moduleDoc.usesPlatformCapabilities.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'Cumais ardáin úsáidte' : 'Platform capabilities used'}
            </p>
            <div className="flex flex-wrap gap-2">
              {moduleDoc.usesPlatformCapabilities.map((cap) => (
                <Link
                  key={cap._id}
                  href={`/${locale}/platform`}
                  className="font-mono text-2xs uppercase tracking-wide px-2.5 py-1 bg-surface-raised border border-surface-border rounded text-ink-muted hover:border-primary-300 hover:text-primary-700 transition-colors"
                >
                  {t(cap.title, locale)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
