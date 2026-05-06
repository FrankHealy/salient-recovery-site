// src/app/[locale]/resources/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import {
  ALL_RESOURCES_QUERY,
  REVIEWED_SIGNALS_QUERY,
  REVIEWED_RESEARCH_QUERY,
  REVIEWED_POLICY_UPDATES_QUERY,
  LATEST_DIGEST_QUERY,
} from '@/lib/sanity/queries';
import type { ResourceArticle, ExternalSignal, ResearchPaperSummary, PolicyUpdate, WeeklyDigest } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, ResourceCard, ExternalSignalCard } from '@/components/ui/index';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'Resources' };

export default async function ResourcesPage({ params: { locale } }: Props) {
  const [articles, signals, research, policies, digest]: [
    ResourceArticle[],
    ExternalSignal[],
    ResearchPaperSummary[],
    PolicyUpdate[],
    WeeklyDigest | null,
  ] = await Promise.all([
    client.fetch(ALL_RESOURCES_QUERY),
    client.fetch(REVIEWED_SIGNALS_QUERY),
    client.fetch(REVIEWED_RESEARCH_QUERY),
    client.fetch(REVIEWED_POLICY_UPDATES_QUERY),
    client.fetch(LATEST_DIGEST_QUERY),
  ]);

  const tabs = [
    { key: 'articles', labelEn: 'Articles', labelIe: 'Ailt', count: articles.length },
    { key: 'signals', labelEn: 'External Signals', labelIe: 'Comharthaí Seachtracha', count: signals.length },
    { key: 'research', labelEn: 'Research', labelIe: 'Taighde', count: research.length },
    { key: 'policy', labelEn: 'Policy Updates', labelIe: 'Nuashonruithe Polasaí', count: policies.length },
  ];

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Acmhainní' : 'Resources'}
        heading={locale === 'ie' ? 'Acmhainní agus comhthéacs earnála' : 'Resources and sector context'}
        statement={locale === 'ie'
          ? 'Ábhar eagarthóireachta, comharthaí seachtracha athbhreithnithe, achoimrí taighde, agus nuashonruithe polasaí ábhartha do sheirbhísí cúraim rialáilte.'
          : 'Editorial content, reviewed external signals, research summaries, and policy updates relevant to regulated care services.'}
      />

      {/* Latest digest banner */}
      {digest && (
        <section className="border-b border-surface-border bg-primary-50">
          <div className="container-site py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-primary-600 mb-1">
                  {locale === 'ie' ? 'Díleá is Déanaí' : 'Latest Digest'}
                </p>
                <p className="font-serif text-base text-primary-800">
                  {t(digest.title, locale) || `${locale === 'ie' ? 'Seachtain dar críoch' : 'Week ending'} ${digest.weekEnding}`}
                </p>
                <p className="text-sm text-ink-secondary mt-1">{t(digest.summary, locale)}</p>
              </div>
              <div className="shrink-0">
                <span className="font-mono text-xs text-primary-600 border border-primary-200 rounded px-3 py-1.5 bg-surface-base">
                  {digest.weekEnding}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <section className="border-b border-surface-border section-pad">
          <div className="container-site">
            <div className="mb-8">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                {locale === 'ie' ? 'Ailt' : 'Articles'}
              </p>
              <h2 className="font-serif text-2xl text-primary-800">
                {locale === 'ie' ? 'Ábhar eagarthóireachta' : 'Editorial content'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article) => (
                <ResourceCard
                  key={article._id}
                  slug={article.slug}
                  title={t(article.title, locale)}
                  summary={t(article.summary, locale)}
                  category={article.category}
                  publishedAt={article.publishedAt}
                  readingTime={article.readingTimeMinutes}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* External Signals */}
      {signals.length > 0 && (
        <section className="border-b border-surface-border section-pad bg-surface-raised">
          <div className="container-site">
            <div className="mb-8">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                {locale === 'ie' ? 'Comharthaí Seachtracha' : 'External Signals'}
              </p>
              <h2 className="font-serif text-2xl text-primary-800">
                {locale === 'ie' ? 'Nuashonruithe arna n-athbhreithniú' : 'Reviewed updates'}
              </h2>
              <p className="mt-2 text-sm text-ink-secondary max-w-prose-tight">
                {locale === 'ie'
                  ? 'Foinsí seachtracha arna n-athbhreithniú ag eagarthóir. Ní léiríonn siad dearcadh Salient Recovery.'
                  : 'External sources reviewed by an editor. They do not represent the views of Salient Recovery.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signals.map((signal) => (
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
          </div>
        </section>
      )}

      {/* Research Papers */}
      {research.length > 0 && (
        <section className="border-b border-surface-border section-pad">
          <div className="container-site">
            <div className="mb-8">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                {locale === 'ie' ? 'Taighde' : 'Research'}
              </p>
              <h2 className="font-serif text-2xl text-primary-800">
                {locale === 'ie' ? 'Achoimrí páipéir taighde' : 'Research paper summaries'}
              </h2>
            </div>
            <div className="flex flex-col gap-5 max-w-3xl">
              {research.map((paper) => (
                <article key={paper._id} className="border border-surface-border rounded p-5 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2 items-baseline">
                    <h3 className="font-sans font-semibold text-sm text-ink-primary">{paper.paperTitle}</h3>
                    {paper.publishedYear && (
                      <span className="font-mono text-2xs text-ink-muted shrink-0">{paper.publishedYear}</span>
                    )}
                  </div>
                  {paper.authors && (
                    <p className="text-xs text-ink-muted">{paper.authors}{paper.journal && ` · ${paper.journal}`}</p>
                  )}
                  <p className="text-sm text-ink-secondary leading-relaxed">{t(paper.summary, locale)}</p>
                  {t(paper.relevanceNote, locale) && (
                    <p className="text-xs text-ink-muted italic pt-2 border-t border-surface-border">
                      {t(paper.relevanceNote, locale)}
                    </p>
                  )}
                  {paper.doi && (
                    <a href={paper.doi} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-primary-600 hover:text-primary-800 transition-colors">
                      {locale === 'ie' ? 'Féach ar fhoinse →' : 'View source →'}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Policy Updates */}
      {policies.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <div className="mb-8">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                {locale === 'ie' ? 'Nuashonruithe Polasaí' : 'Policy Updates'}
              </p>
              <h2 className="font-serif text-2xl text-primary-800">
                {locale === 'ie' ? 'Nuashonruithe polasaí ábhartha' : 'Relevant policy updates'}
              </h2>
            </div>
            <div className="flex flex-col gap-4 max-w-3xl">
              {policies.map((policy) => (
                <article key={policy._id} className="border border-surface-border rounded p-5 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-2xs text-ink-muted">{policy.issuingBody}</span>
                    {policy.effectiveDate && (
                      <>
                        <span className="text-surface-border">·</span>
                        <span className="font-mono text-2xs text-ink-muted">
                          {new Date(policy.effectiveDate).toLocaleDateString('en-IE', { year: 'numeric', month: 'long' })}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-base text-primary-800">{t(policy.title, locale)}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{t(policy.summary, locale)}</p>
                  {t(policy.impactAssessment, locale) && (
                    <div className="pt-2 border-t border-surface-border">
                      <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-1">
                        {locale === 'ie' ? 'Tionchar' : 'Impact'}
                      </p>
                      <p className="text-xs text-ink-secondary">{t(policy.impactAssessment, locale)}</p>
                    </div>
                  )}
                  {policy.sourceUrl && (
                    <a href={policy.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-primary-600 hover:text-primary-800 transition-colors">
                      {locale === 'ie' ? 'Féach ar fhoinse →' : 'View source →'}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
