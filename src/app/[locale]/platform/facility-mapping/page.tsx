// src/app/[locale]/platform/facility-mapping/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../../../sanity/client';
import { PLATFORM_FEATURES_BY_ENTITY_QUERY } from '@sanity/queries';
import type { PlatformFeature } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, FeatureBlock } from '@/components/ui/index';

interface Props { params: { locale: Locale } }
export const metadata: Metadata = { title: 'Facility Mapping' };

export default async function FacilityMappingPage({ params: { locale } }: Props) {
  const features: PlatformFeature[] = await client.fetch(PLATFORM_FEATURES_BY_ENTITY_QUERY, { entity: 'facility' });

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Ardán / Léarscáiliú Áise' : 'Platform / Facility Mapping'}
        heading={locale === 'ie' ? 'Léarscáiliú áise agus aonaid' : 'Facility and unit mapping'}
        statement={locale === 'ie'
          ? 'Tá struchtúr fisiciúil na seirbhíse — foirgnimh, aonad, leapacha, seomraí — mapaite laistigh den chóras. Cuireann sé seo ar chumas leithdháilte cónaitheora, rianú cáipéisíochta, agus tuairisciú físiciúil.'
          : 'The physical structure of the service — buildings, units, beds, rooms — is mapped within the system. This enables resident allocation, documentation tracking, and physical reporting.'}
      >
        <Link href={`/${locale}/platform`} className="text-xs font-mono text-ink-muted hover:text-ink-secondary transition-colors">
          ← {locale === 'ie' ? 'Ardán' : 'Platform'}
        </Link>
      </PageHero>

      <section className="border-b border-surface-border section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-4">
                {locale === 'ie' ? 'Struchtúr' : 'Structure'}
              </p>
              <div className="flex flex-col gap-1 font-mono text-sm">
                {[
                  { levelEn: 'Organisation', levelIe: 'Eagraíocht', indent: 0 },
                  { levelEn: '└ Facility', levelIe: '└ Áis', indent: 1 },
                  { levelEn: '  └ Building', levelIe: '  └ Foirgneamh', indent: 2 },
                  { levelEn: '    └ Unit / Wing', levelIe: '    └ Aonad / Sciathán', indent: 3 },
                  { levelEn: '      └ Room / Bed', levelIe: '      └ Seomra / Leaba', indent: 4 },
                ].map(({ levelEn, levelIe }) => (
                  <p key={levelEn} className="text-ink-secondary">{locale === 'ie' ? levelIe : levelEn}</p>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-muted">
                {locale === 'ie'
                  ? 'Cumraítear an struchtúr le linn socrú na seirbhíse agus is féidir é a nuashonrú de réir mar a athraíonn an tsaoráid.'
                  : 'The structure is configured during service setup and can be updated as the facility changes.'}
              </p>
            </div>
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-4">
                {locale === 'ie' ? 'Úsáidí' : 'Uses'}
              </p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    en: 'Allocate residents to specific beds or rooms on admission',
                    ie: 'Cónaitheoirí a leithdháileadh ar leapacha nó seomraí sonracha ar ionanálú',
                  },
                  {
                    en: 'Track occupancy across units and buildings',
                    ie: 'Áitíocht a rianú trasna aonaid agus foirgneamh',
                  },
                  {
                    en: 'Scope incident reports and risk assessments to physical locations',
                    ie: 'Tuarascálacha teagmhais agus measúnuithe riosca a scópadh chuig suíomhanna fisiciúla',
                  },
                  {
                    en: 'Generate facility-level compliance reports for inspection',
                    ie: 'Tuarascálacha comhlíonta ag leibhéal na háise a ghiniúint le haghaidh cigireachta',
                  },
                ].map(({ en, ie }, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <span className="font-mono text-xs text-ink-muted shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    {locale === 'ie' ? ie : en}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
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
