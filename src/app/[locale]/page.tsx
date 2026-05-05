// src/app/[locale]/page.tsx
import Link from 'next/link';
import { client } from '../../../sanity/client';
import {
  ALL_PLATFORM_FEATURES_QUERY,
  ALL_SECTORS_QUERY,
  REVIEWED_SIGNALS_QUERY,
} from '@cms/queries';
import type { PlatformFeature, SectorPage, ExternalSignal } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { FeatureBlock, ExternalSignalCard } from '@/components/ui/index';

interface Props {
  params: { locale: Locale };
}

export default async function HomePage({ params: { locale } }: Props) {
  const [features, sectors, signals]: [PlatformFeature[], SectorPage[], ExternalSignal[]] = await Promise.all([
    client.fetch(ALL_PLATFORM_FEATURES_QUERY),
    client.fetch(ALL_SECTORS_QUERY),
    client.fetch(REVIEWED_SIGNALS_QUERY),
  ]);

  const topFeatures = features.slice(0, 6);
  const recentSignals = signals.slice(0, 3);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="border-b border-surface-border">
        <div className="container-site py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-5">
              {locale === 'ie' ? 'Ardán Oibríochta Cliniciúla' : 'Clinical Operations Platform'}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary-900 leading-tight">
              {locale === 'ie'
                ? 'Bonneagar oibríochta do sheirbhísí cúraim rialáilte'
                : 'Operational infrastructure for regulated care services'}
            </h1>
            <p className="mt-6 text-lg text-ink-secondary leading-relaxed max-w-prose-tight">
              {locale === 'ie'
                ? 'Tacaíonn Salient Recovery le soláthar seirbhíse laethúil, comhlíonadh rialála, agus inrochtaineacht sonraí i seirbhísí cúraim chónaitheacha agus meabhairshláinte.'
                : 'Salient Recovery supports daily service delivery, regulatory compliance, and data accessibility in residential care and mental health services.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/platform`}
                className="inline-flex items-center px-5 py-2.5 bg-primary-800 text-ink-inverse text-sm font-medium rounded
                           hover:bg-primary-700 transition-colors duration-200"
              >
                {locale === 'ie' ? 'Féach ar an Ardán' : 'View the Platform'}
              </Link>
              <Link
                href={`/${locale}/how-it-works`}
                className="inline-flex items-center px-5 py-2.5 border border-primary-700 text-primary-700 text-sm font-medium rounded
                           hover:bg-primary-50 transition-colors duration-200"
              >
                {locale === 'ie' ? 'Conas a Oibríonn' : 'How it Works'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What it is ──────────────────────────────────────────────────── */}
      <section className="border-b border-surface-border section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                label: locale === 'ie' ? 'Cad é' : 'What it is',
                body: locale === 'ie'
                  ? 'Córas bainistíochta cliniciúla deartha go sonrach do sholáthróirí seirbhíse rialáilte in Éirinn agus i dTuaisceart Éireann.'
                  : 'A clinical management system designed specifically for regulated service providers in Ireland and Northern Ireland.',
              },
              {
                label: locale === 'ie' ? 'Cad a dhéanann sé' : 'What it does',
                body: locale === 'ie'
                  ? 'Déanann sé bainistiú ar imeachtaí cónaitheora, tuairisciú teagmhas, iniúchadh, clárúchán cláir, agus doiciméadú comhlíonta i gcóras amháin.'
                  : 'Manages resident events, incident reporting, auditing, programme enrolment, and compliance documentation in a single system.',
              },
              {
                label: locale === 'ie' ? 'Cé dó é' : 'Who it is for',
                body: locale === 'ie'
                  ? 'Seirbhísí atá faoi mhaoirseacht HIQA, an Choimisiúin Meabhair-Shláinte, HSE, Tusla, agus RQIA TÉ.'
                  : 'Services regulated by HIQA, the Mental Health Commission, HSE, Tusla, and NI RQIA.',
              },
            ].map(({ label, body }) => (
              <div key={label} className="flex flex-col gap-3">
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted">{label}</p>
                <p className="text-base text-ink-secondary leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Features ────────────────────────────────────────────── */}
      {topFeatures.length > 0 && (
        <section className="border-b border-surface-border section-pad">
          <div className="container-site">
            <div className="mb-10">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
                {locale === 'ie' ? 'Ardán' : 'Platform'}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
                {locale === 'ie' ? 'Gnéithe oibríochta' : 'Operational features'}
              </h2>
              <p className="mt-2 text-base text-ink-secondary max-w-prose-tight">
                {locale === 'ie'
                  ? 'Gach gné mapaíonn chuig eintiteas córais nó toradh oibríochta.'
                  : 'Each feature maps to a system entity or operational outcome.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topFeatures.map((feature) => (
                <FeatureBlock
                  key={feature._id}
                  entity={feature.associatedEntity}
                  title={t(feature.title, locale)}
                  description={t(feature.shortDescription, locale)}
                  capabilities={feature.capabilities?.map((c) => t(c.label, locale)).filter(Boolean)}
                  regulatoryRelevance={feature.regulatoryRelevance}
                />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={`/${locale}/platform`}
                className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
              >
                {locale === 'ie' ? 'Féach ar an ardán iomlán →' : 'View full platform →'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Sectors ─────────────────────────────────────────────────────── */}
      {sectors.length > 0 && (
        <section className="border-b border-surface-border section-pad bg-surface-raised">
          <div className="container-site">
            <div className="mb-10">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
                {locale === 'ie' ? 'Earnálacha' : 'Sectors'}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
                {locale === 'ie' ? 'Earnálacha arna seirbhíseoiodh' : 'Sectors served'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectors.map((sector) => (
                <Link
                  key={sector._id}
                  href={`/${locale}/sectors#${sector.slug}`}
                  className="p-5 bg-surface-base border border-surface-border rounded
                             hover:border-primary-300 transition-colors duration-200 group"
                >
                  <h3 className="font-serif text-base text-primary-800 group-hover:text-primary-600 transition-colors">
                    {t(sector.name, locale)}
                  </h3>
                  <p className="mt-2 text-sm text-ink-secondary leading-relaxed line-clamp-2">
                    {t(sector.summary, locale)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recent Signals ───────────────────────────────────────────────── */}
      {recentSignals.length > 0 && (
        <section className="border-b border-surface-border section-pad">
          <div className="container-site">
            <div className="mb-10">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
                {locale === 'ie' ? 'Comhthéacs Earnála' : 'Sector Context'}
              </p>
              <h2 className="font-serif text-2xl text-primary-800">
                {locale === 'ie' ? 'Nuashonruithe seachtracha le déanaí' : 'Recent external updates'}
              </h2>
              <p className="mt-2 text-sm text-ink-secondary max-w-prose-tight">
                {locale === 'ie'
                  ? 'Foinsí seachtracha arna n-athbhreithniú ag eagarthóir. Níl Salient Recovery freagrach as ábhar seachtrach.'
                  : 'External sources reviewed by an editor. Salient Recovery is not responsible for external content.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentSignals.map((signal) => (
                <ExternalSignalCard
                  key={signal._id}
                  title={t(signal.title, locale)}
                  summary={t(signal.summary, locale)}
                  sourceName={signal.sourceName}
                  sourceUrl={signal.sourceUrl}
                  publishedDate={signal.publishedDate}
                  topic={signal.topic}
                  region={signal.region}
                  relevanceNote={t(signal.relevanceNote, locale)}
                />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={`/${locale}/resources`}
                className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
              >
                {locale === 'ie' ? 'Féach ar na hacmhainní go léir →' : 'View all resources →'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Next Step ────────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="max-w-xl">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'An Chéad Chéim Eile' : 'Next Step'}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
              {locale === 'ie' ? 'Caint linn faoi do sheirbhís' : 'Speak with us about your service'}
            </h2>
            <p className="mt-3 text-base text-ink-secondary leading-relaxed">
              {locale === 'ie'
                ? 'Má tá tú ag fiosrú faoi bhainistiú oibríochta do sheirbhís cúraim rialáilte, is féidir linn suí síos agus iniúchadh a dhéanamh ar conas a d\'oibreodh an córas i do chomhthéacs.'
                : 'If you are exploring operational management for a regulated care service, we can sit down and examine how the system would work in your context.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-5 py-2.5 bg-primary-800 text-ink-inverse text-sm font-medium rounded
                           hover:bg-primary-700 transition-colors duration-200"
              >
                {locale === 'ie' ? 'Déan Teagmháil' : 'Get in Touch'}
              </Link>
              <Link
                href={`/${locale}/how-it-works`}
                className="inline-flex items-center px-5 py-2.5 border border-surface-border text-ink-secondary text-sm font-medium rounded
                           hover:border-primary-300 hover:text-ink-primary transition-colors duration-200"
              >
                {locale === 'ie' ? 'Conas a Oibríonn' : 'How it Works'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
