// src/app/[locale]/platform/timeline/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../../../sanity/client';
import { PLATFORM_FEATURES_BY_ENTITY_QUERY } from '@sanity/queries';
import type { PlatformFeature } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, FeatureBlock } from '@/components/ui/index';

interface Props { params: { locale: Locale } }
export const metadata: Metadata = { title: 'Timeline View' };

export default async function TimelinePage({ params: { locale } }: Props) {
  const features: PlatformFeature[] = await client.fetch(PLATFORM_FEATURES_BY_ENTITY_QUERY, { entity: 'event' });

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Ardán / Amlíne' : 'Platform / Timeline'}
        heading={locale === 'ie' ? 'Amharc amlíne' : 'Timeline view'}
        statement={locale === 'ie'
          ? 'Léiríonn an amharc amlíne stair iomlán imeachtaí cónaitheora in ord crónaeolaíoch — íocaíochtaí, cuairteanna, imeachtaí cliniciúla, agus taifid doiciméadaithe.'
          : 'The timeline view presents the complete history of resident events in chronological order — admissions, visits, clinical events, and documentation records.'}
      >
        <Link href={`/${locale}/platform`} className="text-xs font-mono text-ink-muted hover:text-ink-secondary transition-colors">
          ← {locale === 'ie' ? 'Ardán' : 'Platform'}
        </Link>
      </PageHero>

      <section className="border-b border-surface-border section-pad">
        <div className="container-site">
          <div className="max-w-2xl mb-10">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'Cad a thaispeánann sé' : 'What it shows'}
            </p>
            <p className="text-base text-ink-secondary leading-relaxed">
              {locale === 'ie'
                ? 'Cruthaíonn gach gníomh a dhéanann úsáideoir údaraithe ar chuntas cónaitheora iontráil amlíne — cuairteanna cúraim, measúnuithe, imeachtaí cláir, teagmhais, agus nótaí. Ní féidir iontrálacha a scriosadh.'
                : 'Every action an authorised user takes on a resident record creates a timeline entry — care visits, assessments, programme events, incidents, and notes. Entries cannot be deleted.'}
            </p>
          </div>

          {/* Visual representation of timeline concept */}
          <div className="max-w-xl bg-surface-raised border border-surface-border rounded p-6">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-5">
              {locale === 'ie' ? 'Samhail' : 'Illustrative structure'}
            </p>
            {[
              { type: 'assessment', time: '09:14', actor: 'clinician', labelEn: 'Risk assessment completed', labelIe: 'Measúnú riosca críochnaithe' },
              { type: 'programme', time: '11:00', actor: 'key-worker', labelEn: 'Programme session attended', labelIe: 'Seisiún cláir freastail' },
              { type: 'incident', time: '14:32', actor: 'manager', labelEn: 'Incident recorded and categorised', labelIe: 'Teagmhas taifeadta agus catagóirithe' },
              { type: 'note', time: '16:45', actor: 'key-worker', labelEn: 'Key worker note added', labelIe: 'Nóta príomhoibrí curtha leis' },
            ].map((entry, i) => (
              <div key={i} className="flex gap-4 mb-4 last:mb-0">
                <span className="font-mono text-xs text-ink-muted shrink-0 pt-0.5 w-10 text-right">{entry.time}</span>
                <div className="flex-1 flex items-start gap-3 border-l border-surface-border pl-4">
                  <span className="font-mono text-2xs uppercase text-ink-muted bg-surface-base border border-surface-border rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    {entry.actor}
                  </span>
                  <span className="text-sm text-ink-secondary">{locale === 'ie' ? entry.labelIe : entry.labelEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-6">
              {locale === 'ie' ? 'Gnéithe ábhartha' : 'Related features'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <FeatureBlock
                  key={f._id}
                  entity={f.associatedEntity}
                  title={t(f.title, locale)}
                  description={t(f.shortDescription, locale)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
