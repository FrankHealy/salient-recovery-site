// src/app/[locale]/contact/page.tsx
import type { Metadata } from 'next';
import { client } from '../../../../sanity/client';
import { SITE_SETTINGS_QUERY } from '@cms/queries';
import type { SiteSettings } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero } from '@/components/ui/index';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'Contact' };

export default async function ContactPage({ params: { locale } }: Props) {
  const settings: SiteSettings | null = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Teagmháil' : 'Contact'}
        heading={locale === 'ie' ? 'Déan teagmháil' : 'Get in touch'}
        statement={locale === 'ie'
          ? 'Más mian leat tuilleadh a fháil amach faoin ardán nó faoi conas is féidir leis tacú le do sheirbhís, cuir ríomhphost chugainn.'
          : 'If you would like to find out more about the platform or how it could support your service, send us an email.'}
      />

      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Contact details */}
            <div className="flex flex-col gap-8">
              {settings?.contactEmail && (
                <div>
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                    {locale === 'ie' ? 'Ríomhphost' : 'Email'}
                  </p>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="font-serif text-lg text-primary-700 hover:text-primary-900 transition-colors"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              )}

              {settings?.contactPhone && (
                <div>
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                    {locale === 'ie' ? 'Guthán' : 'Phone'}
                  </p>
                  <a
                    href={`tel:${settings.contactPhone.replace(/\s/g, '')}`}
                    className="font-serif text-lg text-primary-700 hover:text-primary-900 transition-colors"
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              )}

              {settings?.address && (
                <div>
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                    {locale === 'ie' ? 'Seoladh' : 'Address'}
                  </p>
                  <address className="not-italic text-base text-ink-secondary space-y-0.5">
                    {settings.address.line1 && <p>{settings.address.line1}</p>}
                    {settings.address.line2 && <p>{settings.address.line2}</p>}
                    {settings.address.city && <p>{settings.address.city}</p>}
                    {settings.address.postcode && <p>{settings.address.postcode}</p>}
                    {settings.address.country && <p>{settings.address.country}</p>}
                  </address>
                </div>
              )}

              {settings?.linkedinUrl && (
                <div>
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-2">
                    LinkedIn
                  </p>
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    {locale === 'ie' ? 'Féach ar ár leathanach LinkedIn →' : 'View our LinkedIn page →'}
                  </a>
                </div>
              )}
            </div>

            {/* What to expect */}
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-4">
                {locale === 'ie' ? 'Cad ba chóir a bheith ag súil leis' : 'What to expect'}
              </p>
              <div className="flex flex-col gap-5">
                {[
                  {
                    stepEn: '01',
                    labelEn: 'Initial conversation',
                    labelIe: 'Comhrá tosaigh',
                    bodyEn: 'We will ask about your service type, size, regulatory context, and current documentation processes.',
                    bodyIe: 'Fiafróimid de chineál, méid, comhthéacs rialála agus próisis doiciméadaithe reatha do sheirbhíse.',
                  },
                  {
                    stepEn: '02',
                    labelEn: 'Platform walkthrough',
                    labelIe: 'Turas trí ardán',
                    bodyEn: 'We will show the system as it operates in live services, focusing on the workflows most relevant to you.',
                    bodyIe: 'Taispeánfaimid an córas mar a oibríonn sé i seirbhísí beo, ag díriú ar na sreafaí oibre is ábhartha duit.',
                  },
                  {
                    stepEn: '03',
                    labelEn: 'Implementation assessment',
                    labelIe: 'Measúnú cur i bhfeidhm',
                    bodyEn: 'If appropriate, we assess what onboarding would involve for your specific service.',
                    bodyIe: 'Más cuí, déanaimid measúnú ar an méid a bheadh i gceist le bordáil do do sheirbhís ar leith.',
                  },
                ].map(({ stepEn, labelEn, labelIe, bodyEn, bodyIe }) => (
                  <div key={stepEn} className="flex gap-4">
                    <span className="font-mono text-xs text-ink-muted shrink-0 mt-0.5">{stepEn}</span>
                    <div>
                      <p className="font-sans font-semibold text-sm text-ink-primary mb-1">
                        {locale === 'ie' ? labelIe : labelEn}
                      </p>
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {locale === 'ie' ? bodyIe : bodyEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
