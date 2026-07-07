// src/app/[locale]/platform/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { ALL_PLATFORM_CAPABILITIES_QUERY } from '@/lib/sanity/queries';
import { ALL_COMPLIANCE_QUERY } from '@/lib/sanity/queries';
import type { PlatformCapability, ComplianceStatement } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, SectionHeader, ComplianceBadge } from '@/components/ui/index';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'Platform' };

export default async function PlatformPage({ params: { locale } }: Props) {
  const [capabilities, compliance]: [PlatformCapability[], ComplianceStatement[]] = await Promise.all([
    client.fetch(ALL_PLATFORM_CAPABILITIES_QUERY),
    client.fetch(ALL_COMPLIANCE_QUERY),
  ]);

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Ardán' : 'Platform'}
        heading={locale === 'ie' ? 'Deartha don iontaofacht agus don scála' : 'Built for trust and scale'}
        statement={locale === 'ie'
          ? 'Bunáit theicniúil Acutis — slándáil, conair iniúchta, ceadanna, agus an leibhéal cumraíochta a bhfuil súil ag do sheirbhís leis. Míníonn na modúil oibríochtúla an obair laethúil; míníonn an leathanach seo an teicneolaíocht a thacaíonn léi.'
          : 'The technical foundation underneath Acutis — security, audit trail, permissions, and the level of configuration your service expects. The operational modules explain the day-to-day work; this page explains the technology behind it.'}
      />

      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap) => (
              <div
                key={cap._id}
                id={cap.capabilityId?.current}
                className="border border-surface-border rounded bg-surface-base p-6 flex flex-col gap-3 scroll-mt-24"
              >
                <span className="font-mono text-2xs uppercase tracking-widest text-ink-muted">{cap.category}</span>
                <h3 className="font-serif text-lg text-primary-800">{t(cap.title, locale)}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{t(cap.shortDescription, locale)}</p>
                {cap.technicalDetail && t(cap.technicalDetail, locale) && (
                  <p className="text-xs text-ink-muted leading-relaxed pt-2 border-t border-surface-border">
                    {t(cap.technicalDetail, locale)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
              {locale === 'ie' ? 'Féach ar na modúil oibríochtúla' : 'See the operational modules'}
            </h2>
            <p className="mt-2 text-base text-ink-secondary">
              {locale === 'ie'
                ? 'Breathnaigh ar an obair laethúil a thacaíonn an t-ardán seo léi, modúl ar mhodúl.'
                : 'Review the day-to-day work this platform supports, module by module.'}
            </p>
            <div className="mt-5 flex gap-3">
              <Link href={`/${locale}/modules`} className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
                {locale === 'ie' ? 'Féach na Modúil →' : 'Explore Modules →'}
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
