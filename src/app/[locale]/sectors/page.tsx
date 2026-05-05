// src/app/[locale]/sectors/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../../sanity/client';
import { ALL_SECTORS_QUERY } from '@cms/queries';
import type { SectorPage } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, FeatureBlock } from '@/components/ui/index';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'Sectors' };

export default async function SectorsPage({ params: { locale } }: Props) {
  const sectors: SectorPage[] = await client.fetch(ALL_SECTORS_QUERY);

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Earnálacha' : 'Sectors'}
        heading={locale === 'ie' ? 'Earnálacha arna seirbhíseoiodh' : 'Sectors served'}
        statement={locale === 'ie'
          ? 'Tá Salient Recovery infheidhme trasna earnálacha cúraim rialáilte. Faigheann gach earnáil comhthéacs rialála sonrach agus na gnéithe ardáin ábhartha.'
          : 'Salient Recovery is applicable across regulated care sectors. Each sector receives specific regulatory context and the relevant platform features.'}
      />

      {/* Sector detail sections */}
      {sectors.length > 0 ? (
        sectors.map((sector, idx) => (
          <section
            key={sector._id}
            id={sector.slug}
            className={`border-b border-surface-border section-pad ${idx % 2 === 1 ? 'bg-surface-raised' : ''}`}
          >
            <div className="container-site">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

                {/* Left: sector info */}
                <div className="lg:col-span-1">
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
                    {locale === 'ie' ? 'Earnáil' : 'Sector'}
                  </p>
                  <h2 className="font-serif text-xl md:text-2xl text-primary-800 mb-4">
                    {t(sector.name, locale)}
                  </h2>
                  <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                    {t(sector.summary, locale)}
                  </p>
                  {t(sector.regulatoryContext, locale) && (
                    <div className="border-l-2 border-surface-border pl-4">
                      <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                        {locale === 'ie' ? 'Comhthéacs Rialála' : 'Regulatory Context'}
                      </p>
                      <p className="text-xs text-ink-secondary leading-relaxed">
                        {t(sector.regulatoryContext, locale)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: applicable features */}
                <div className="lg:col-span-2">
                  {sector.applicableFeatures && sector.applicableFeatures.length > 0 ? (
                    <>
                      <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-5">
                        {locale === 'ie' ? 'Gnéithe Infheidhme' : 'Applicable Features'}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sector.applicableFeatures.map((feature) => (
                          <FeatureBlock
                            key={feature._id}
                            entity={feature.associatedEntity}
                            title={t(feature.title, locale)}
                            description={t(feature.shortDescription, locale)}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="border border-dashed border-surface-border rounded p-6 text-sm text-ink-muted">
                      {locale === 'ie' ? 'Gnéithe le cur leis sa CMS' : 'Features to be added in CMS'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="section-pad">
          <div className="container-site">
            <p className="text-ink-muted text-sm">
              {locale === 'ie' ? 'Níl aon earnáil foilsithe fós.' : 'No sectors published yet.'}
            </p>
          </div>
        </section>
      )}

      {/* Next step */}
      <section className="section-pad">
        <div className="container-site">
          <div className="max-w-lg">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'An Chéad Chéim Eile' : 'Next Step'}
            </p>
            <h2 className="font-serif text-2xl text-primary-800">
              {locale === 'ie' ? 'Plé faoi do chás sonrach' : 'Discuss your specific context'}
            </h2>
            <p className="mt-2 text-base text-ink-secondary">
              {locale === 'ie'
                ? 'Tá gach seirbhís éagsúil. Is féidir linn breathnú ar na gnéithe is ábhartha do do chás rialála agus oibríochta.'
                : 'Every service is different. We can look at the features most relevant to your regulatory and operational context.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-5 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
            >
              {locale === 'ie' ? 'Déan Teagmháil →' : 'Get in Touch →'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
