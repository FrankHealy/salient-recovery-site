// src/app/[locale]/about/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { PageHero } from '@/components/ui/index';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'About' };

export default function AboutPage({ params: { locale } }: Props) {
  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Faoi' : 'About'}
        heading={locale === 'ie' ? 'Faoi Salient Recovery' : 'About Salient Recovery'}
        statement={locale === 'ie'
          ? 'Is cuideachta bogearraí Éireannach í Salient Recovery a dhíríonn ar bhonneagar oibríochta do sheirbhísí cúraim rialáilte.'
          : 'Salient Recovery is an Irish software company focused on operational infrastructure for regulated care services.'}
      />

      {/* What we do */}
      <section className="border-b border-surface-border section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-4">
                {locale === 'ie' ? 'Ár gCúram' : 'Our Focus'}
              </p>
              <h2 className="font-serif text-2xl text-primary-800 mb-4">
                {locale === 'ie' ? 'Córais oibríochta do sheirbhísí cúraim' : 'Operational systems for care services'}
              </h2>
              <div className="prose-salient">
                <p>
                  {locale === 'ie'
                    ? 'Tógamar Acutis — córas bainistíochta cliniciúla atá deartha go sonrach do sholáthróirí seirbhíse cónaitheacha agus meabhairshláinte in Éirinn agus i dTuaisceart Éireann.'
                    : 'We built Acutis — a clinical management system designed specifically for residential and mental health service providers in Ireland and Northern Ireland.'}
                </p>
                <p>
                  {locale === 'ie'
                    ? 'Tugann Acutis deis do sheirbhísí oibríochtaí laethúla a bhainistiú, doiciméid a thaifeadadh go cruinn, agus comhlíonadh a thaispeáint d\'údaráis rialála.'
                    : 'Acutis enables services to manage daily operations, record documentation accurately, and demonstrate compliance to regulatory authorities.'}
                </p>
              </div>
            </div>
            <div>
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-4">
                {locale === 'ie' ? 'Ár gCur Chuige' : 'Our Approach'}
              </p>
              <div className="flex flex-col gap-5">
                {[
                  {
                    labelEn: 'Sector-specific',
                    labelIe: 'Sainiúil don earnáil',
                    bodyEn: 'Built around the actual entities and workflows of residential and mental health care — not adapted from generic case management tools.',
                    bodyIe: 'Tógtha timpeall na n-eintiteas agus na sreafaí oibre iarbhír d\'earnálacha cúraim chónaitheacha agus meabhairshláinte.',
                  },
                  {
                    labelEn: 'Compliance-first',
                    labelIe: 'Comhlíonadh ar dtús',
                    bodyEn: 'Every data structure and workflow is designed with regulatory inspection and audit in mind from the outset.',
                    bodyIe: 'Tá gach struchtúr sonraí agus sruth oibre deartha le cigireacht rialála agus iniúchadh san áireamh ón tús.',
                  },
                  {
                    labelEn: 'No unnecessary complexity',
                    labelIe: 'Gan casta gan ghá',
                    bodyEn: 'Staff in care settings should be able to complete documentation without technical training. The system is functional, not complex.',
                    bodyIe: 'Ba chóir go mbeadh foireann in ann doiciméadú a chríochnú gan oiliúint theicniúil. Tá an córas feidhmiúil, ní casta.',
                  },
                ].map(({ labelEn, labelIe, bodyEn, bodyIe }) => (
                  <div key={labelEn} className="border-l-2 border-primary-200 pl-4">
                    <p className="font-sans font-semibold text-sm text-ink-primary mb-1">
                      {locale === 'ie' ? labelIe : labelEn}
                    </p>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {locale === 'ie' ? bodyIe : bodyEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acutis system note */}
      <section className="border-b border-surface-border section-pad bg-surface-raised">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-4">
              {locale === 'ie' ? 'Acutis' : 'Acutis'}
            </p>
            <h2 className="font-serif text-2xl text-primary-800 mb-4">
              {locale === 'ie' ? 'An córas oibríochta' : 'The operational system'}
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed mb-4">
              {locale === 'ie'
                ? 'Is é Acutis an córas bainistíochta cliniciúla atá ag bunús an ardáin. Tá sé á oibriú ag seirbhísí beo agus tá sé á dhearadh timpeall na n-eintiteas seo a leanas:'
                : 'Acutis is the clinical management system at the core of the platform. It is operating in live services and is designed around the following entities:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {['resident', 'unit', 'programme', 'event', 'incident', 'audit', 'form', 'facility'].map((entity) => (
                <span
                  key={entity}
                  className="font-mono text-xs px-3 py-1 bg-surface-base border border-surface-border rounded text-ink-secondary"
                >
                  {entity}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              {locale === 'ie'
                ? 'Léiríonn gach eintiteas coincheap oibríochta réadach laistigh de sheirbhís cúraim rialáilte.'
                : 'Each entity represents a real operational concept within a regulated care service.'}
            </p>
          </div>
        </div>
      </section>

      {/* Next step */}
      <section className="section-pad">
        <div className="container-site">
          <div className="max-w-lg">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'An Chéad Chéim Eile' : 'Next Step'}
            </p>
            <h2 className="font-serif text-2xl text-primary-800">
              {locale === 'ie' ? 'Caint linn' : 'Speak with us'}
            </h2>
            <p className="mt-2 text-base text-ink-secondary">
              {locale === 'ie'
                ? 'Má tá tú ag iarraidh tuilleadh a fhoghlaim faoi conas a oibreodh Acutis do do sheirbhís, déan teagmháil.'
                : 'If you want to learn more about how Acutis would work for your service, get in touch.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-5 inline-flex items-center px-5 py-2.5 bg-primary-800 text-ink-inverse text-sm font-medium rounded
                         hover:bg-primary-700 transition-colors duration-200"
            >
              {locale === 'ie' ? 'Déan Teagmháil' : 'Get in Touch'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
