// src/app/[locale]/platform/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../../sanity/client';
import { ALL_PLATFORM_FEATURES_QUERY, ALL_COMPLIANCE_QUERY } from '@cms/queries';
import type { PlatformFeature, ComplianceStatement } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, SectionHeader, FeatureBlock, ComplianceBadge } from '@/components/ui/index';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'Platform' };

const ENTITY_SECTIONS = [
  { entity: 'resident', labelEn: 'Resident Management', labelIe: 'Bainistíocht Cónaitheoirí' },
  { entity: 'incident', labelEn: 'Incident Reporting', labelIe: 'Tuairisciú Teagmhas' },
  { entity: 'audit', labelEn: 'Audit & Compliance', labelIe: 'Iniúchadh & Comhlíonadh' },
  { entity: 'programme', labelEn: 'Programme Delivery', labelIe: 'Seachadadh Cláir' },
  { entity: 'form', labelEn: 'Forms & Documentation', labelIe: 'Foirmeacha & Doiciméadú' },
  { entity: 'facility', labelEn: 'Facility Mapping', labelIe: 'Léarscáiliú Áise' },
];

export default async function PlatformPage({ params: { locale } }: Props) {
  const [features, compliance]: [PlatformFeature[], ComplianceStatement[]] = await Promise.all([
    client.fetch(ALL_PLATFORM_FEATURES_QUERY),
    client.fetch(ALL_COMPLIANCE_QUERY),
  ]);

  const featuresByEntity = ENTITY_SECTIONS.reduce<Record<string, PlatformFeature[]>>((acc, { entity }) => {
    acc[entity] = features.filter((f) => f.associatedEntity === entity);
    return acc;
  }, {});

  const subPages = [
    { href: '/platform/timeline', labelEn: 'Timeline View', labelIe: 'Amharc Amlíne' },
    { href: '/platform/forms', labelEn: 'Forms', labelIe: 'Foirmeacha' },
    { href: '/platform/facility-mapping', labelEn: 'Facility Mapping', labelIe: 'Léarscáiliú Áise' },
    { href: '/platform/audit-compliance', labelEn: 'Audit & Compliance', labelIe: 'Iniúchadh' },
  ];

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Ardán' : 'Platform'}
        heading={locale === 'ie' ? 'Gnéithe oibríochta' : 'Operational features'}
        statement={locale === 'ie'
          ? 'Ligeann Acutis do sholáthraithe seirbhíse cónaitheacha agus meabhairshláinte oibríochtaí laethúla a bhainistiú, doiciméid a thaifeadadh, agus comhlíonadh a thaispeáint.'
          : 'Acutis enables residential and mental health service providers to manage daily operations, record documentation, and demonstrate compliance.'}
      >
        {/* Sub-page nav */}
        <nav className="flex flex-wrap gap-2" aria-label="Platform sections">
          {subPages.map(({ href, labelEn, labelIe }) => (
            <Link
              key={href}
              href={`/${locale}${href}`}
              className="text-xs font-mono border border-surface-border rounded px-3 py-1.5 text-ink-secondary
                         hover:border-primary-300 hover:text-ink-primary transition-colors"
            >
              {locale === 'ie' ? labelIe : labelEn}
            </Link>
          ))}
        </nav>
      </PageHero>

      {/* Feature sections by entity */}
      {ENTITY_SECTIONS.map(({ entity, labelEn, labelIe }) => {
        const entityFeatures = featuresByEntity[entity];
        if (!entityFeatures?.length) return null;
        return (
          <section key={entity} className="border-b border-surface-border section-pad">
            <div className="container-site">
              <SectionHeader
                eyebrow={entity}
                heading={locale === 'ie' ? labelIe : labelEn}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {entityFeatures.map((feature) => (
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
            </div>
          </section>
        );
      })}

      {/* Compliance Statements */}
      {compliance.length > 0 && (
        <section className="section-pad bg-surface-raised border-b border-surface-border">
          <div className="container-site">
            <SectionHeader
              eyebrow={locale === 'ie' ? 'Comhlíonadh' : 'Compliance'}
              heading={locale === 'ie' ? 'Creatanna rialála' : 'Regulatory frameworks'}
              body={locale === 'ie'
                ? 'Tá an t-ardán deartha ar bhealach a léiríonn comhlíonadh na gcaighdeán rialála seo a leanas.'
                : 'The platform is designed to support demonstration of compliance with the following regulatory standards.'}
            />
            <div className="flex flex-col gap-5 max-w-2xl">
              {compliance.map((item) => (
                <ComplianceBadge
                  key={item._id}
                  framework={item.framework}
                  issuingBody={item.issuingBody}
                  statement={t(item.statement, locale)}
                  lastReviewedDate={item.lastReviewedDate}
                />
              ))}
            </div>
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
              {locale === 'ie' ? 'Féach ar conas a oibríonn sé' : 'See how it works'}
            </h2>
            <p className="mt-2 text-base text-ink-secondary">
              {locale === 'ie'
                ? 'Breathnaigh ar sreafaí oibre tipiciúla agus conas a oibríonn an córas i seichimh oibríochta.'
                : 'Review typical workflows and how the system operates across operational sequences.'}
            </p>
            <div className="mt-5 flex gap-3">
              <Link href={`/${locale}/how-it-works`} className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
                {locale === 'ie' ? 'Conas a Oibríonn →' : 'How it Works →'}
              </Link>
              <Link href={`/${locale}/contact`} className="text-sm font-medium text-ink-muted hover:text-ink-secondary transition-colors">
                {locale === 'ie' ? 'Déan Teagmháil →' : 'Contact →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
