// src/app/[locale]/platform/forms/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { PLATFORM_FEATURES_BY_ENTITY_QUERY } from '@/lib/sanity/queries';
import type { PlatformFeature } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero, FeatureBlock } from '@/components/ui/index';

interface Props { params: { locale: Locale } }
export const metadata: Metadata = { title: 'Forms' };

const FORM_CATEGORIES = [
  {
    keyEn: 'Admission forms',
    keyIe: 'Foirmeacha ionanálaithe',
    formsEn: ['Referral & pre-admission assessment', 'Consent to treatment', 'Risk assessment (initial)', 'Medication reconciliation'],
    formsIe: ['Measúnú atreoraithe & réamh-ionanálaithe', 'Toiliú le cóireáil', 'Measúnú riosca (tosaigh)', 'Réiteach cógais'],
  },
  {
    keyEn: 'Ongoing care forms',
    keyIe: 'Foirmeacha cúraim leanúnaigh',
    formsEn: ['Key worker session notes', 'Care plan review', 'Programme attendance', 'Risk review'],
    formsIe: ['Nótaí seisiúin príomhoibrí', 'Athbhreithniú plean cúraim', 'Freastal ar chlár', 'Athbhreithniú riosca'],
  },
  {
    keyEn: 'Incident forms',
    keyIe: 'Foirmeacha teagmhais',
    formsEn: ['Incident initial report', 'Incident review & closure', 'Serious incident escalation', 'Near-miss report'],
    formsIe: ['Tuarascáil thosaigh teagmhais', 'Athbhreithniú & dúnadh teagmhais', 'Ardú teagmhais tromchúisigh', 'Tuarascáil caillteanas beagnach'],
  },
  {
    keyEn: 'Discharge forms',
    keyIe: 'Foirmeacha urscaoilte',
    formsEn: ['Planned discharge summary', 'Unplanned departure record', 'Post-discharge referral', 'Final risk assessment'],
    formsIe: ['Achoimre urscaoilte pleanáilte', 'Taifead imeachta neamhphleanáilte', 'Atreorú iar-urscaoilte', 'Measúnú riosca deiridh'],
  },
];

export default async function FormsPage({ params: { locale } }: Props) {
  const features: PlatformFeature[] = await client.fetch(PLATFORM_FEATURES_BY_ENTITY_QUERY, { entity: 'form' });

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Ardán / Foirmeacha' : 'Platform / Forms'}
        heading={locale === 'ie' ? 'Foirmeacha agus doiciméadú' : 'Forms and documentation'}
        statement={locale === 'ie'
          ? 'Cumraíonn seirbhísí foirmeacha laistigh de Acutis chun a gcuid riachtanas sonrach a léiriú — lena n-áirítear foirmeacha rialála éigeantacha agus foirmeacha cúraim inmheánacha.'
          : 'Services configure forms within Acutis to reflect their specific requirements — including mandatory regulatory forms and internal care forms.'}
      >
        <Link href={`/${locale}/platform`} className="text-xs font-mono text-ink-muted hover:text-ink-secondary transition-colors">
          ← {locale === 'ie' ? 'Ardán' : 'Platform'}
        </Link>
      </PageHero>

      {/* Form categories */}
      <section className="border-b border-surface-border section-pad">
        <div className="container-site">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-8">
            {locale === 'ie' ? 'Cineálacha foirmeacha tipiciúla' : 'Typical form categories'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FORM_CATEGORIES.map(({ keyEn, keyIe, formsEn, formsIe }) => (
              <div key={keyEn} className="border border-surface-border rounded p-5">
                <p className="font-sans font-semibold text-sm text-ink-primary mb-3">
                  {locale === 'ie' ? keyIe : keyEn}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {(locale === 'ie' ? formsIe : formsEn).map((form) => (
                    <li key={form} className="flex items-start gap-2 text-sm text-ink-secondary">
                      <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-primary-300" aria-hidden="true" />
                      {form}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            {locale === 'ie'
              ? '* Is liosta léiriúcháin é seo. Cruthaíonn gach seirbhís a foirmeacha féin de réir a cuid riachtanas.'
              : '* This is an illustrative list. Each service configures its own forms according to its requirements.'}
          </p>
        </div>
      </section>

      {features.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-6">
              {locale === 'ie' ? 'Gnéithe ardáin' : 'Platform features'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <FeatureBlock
                  key={f._id}
                  entity={f.associatedEntity}
                  title={t(f.title, locale)}
                  description={t(f.shortDescription, locale)}
                  capabilities={f.capabilities?.map((c) => t(c.label, locale)).filter(Boolean)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
