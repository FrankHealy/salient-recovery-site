// src/app/[locale]/how-it-works/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { ALL_WORKFLOW_STEPS_QUERY } from '@/lib/sanity/queries';
import type { WorkflowStep, JourneyStage } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { PageHero } from '@/components/ui/index';
import WorkflowDiagram from '@/components/ui/WorkflowDiagram';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'How it Works' };

const JOURNEY_STAGES: { stage: JourneyStage; labelEn: string; labelIe: string; descEn: string; descIe: string }[] = [
  {
    stage: 'admission',
    labelEn: 'Admission', labelIe: 'Iontráil',
    descEn: 'The sequence from referral to confirmed placement — eligibility, pre-admission assessment, and unit allocation.',
    descIe: 'An seicheamh ó atreorú go lonnú deimhnithe — incháilitheacht, measúnú réamh-iontrála, agus leithdháileadh aonaid.',
  },
  {
    stage: 'assessment',
    labelEn: 'Assessment', labelIe: 'Measúnú',
    descEn: 'Structured, HSE-aligned clinical assessment, completed digitally with assisted dictation and validation.',
    descIe: 'Measúnú cliniciúil struchtúrtha, ailínithe le HSE, críochnaithe go digiteach le deachtú cuidithe agus bailíochtú.',
  },
  {
    stage: 'resident-management',
    labelEn: 'Resident Management', labelIe: 'Bainistíocht Cónaitheoirí',
    descEn: 'The resident profile becomes the single reference point for status, care team and legal context throughout the stay.',
    descIe: 'Éiríonn próifíl an chónaitheora ina bpríomhphointe tagartha do stádas, foireann cúraim agus comhthéacs dlíthiúil ar feadh an fhanachta.',
  },
  {
    stage: 'daily-operations',
    labelEn: 'Daily Operations', labelIe: 'Oibríochtaí Laethúla',
    descEn: 'Occupancy, admissions and the day’s schedule are reviewed and run against a live operational timeline.',
    descIe: 'Athbhreithnítear agus reáchtáiltear áitiú, iontrálacha agus sceideal an lae i gcoinne amlíne oibríochtúil bheo.',
  },
  {
    stage: 'group-therapy',
    labelEn: 'Group Therapy', labelIe: 'Teiripe Grúpa',
    descEn: 'Structured group sessions with tap-based observation capture instead of typed notes.',
    descIe: 'Seisiúin ghrúpa struchtúrtha le gabháil breathnóireachta bunaithe ar tapáil in ionad nótaí clóscríofa.',
  },
  {
    stage: 'incident-reporting',
    labelEn: 'Incident Reporting', labelIe: 'Tuairisciú Teagmhas',
    descEn: 'How incidents are recorded, escalated, investigated, and formally closed within the system.',
    descIe: 'Conas a thaifeadtar, a ardaítear, a imscrúdaítear agus a dhúntar teagmhais go foirmiúil laistigh den chóras.',
  },
  {
    stage: 'progress-monitoring',
    labelEn: 'Progress Monitoring', labelIe: 'Monatóireacht Dul Chun Cinn',
    descEn: 'Care plan reviews and operational trend reporting drawn directly from the live record.',
    descIe: 'Athbhreithnithe plean cúraim agus tuairisciú treochta oibríochtúla tarraingthe go díreach ón taifead beo.',
  },
  {
    stage: 'discharge',
    labelEn: 'Discharge', labelIe: 'Scaoileadh',
    descEn: 'Discharge planning, aftercare checklists, and the formal record of a completed residential stay.',
    descIe: 'Pleanáil scaoilte, seicliostaí iar-chúraim, agus taifead foirmiúil d’fhanacht cónaithe críochnaithe.',
  },
  {
    stage: 'community-follow-up',
    labelEn: 'Community Follow-up', labelIe: 'Leantóireacht Phobail',
    descEn: 'The same record continues into community-based support — no re-entry, no lost history.',
    descIe: 'Leanann an taifead céanna isteach i dtacaíocht phobalbhunaithe — gan athiontráil, gan stair caillte.',
  },
];

export default async function HowItWorksPage({ params: { locale } }: Props) {
  const allSteps: WorkflowStep[] = await client.fetch(ALL_WORKFLOW_STEPS_QUERY);

  const stepsByStage = allSteps.reduce<Record<string, WorkflowStep[]>>((acc, step) => {
    if (!acc[step.journeyStage]) acc[step.journeyStage] = [];
    acc[step.journeyStage].push(step);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Conas a Oibríonn' : 'How it Works'}
        heading={locale === 'ie' ? 'Iontráil go dtí leantóireacht phobail, sreabhadh amháin' : 'Admission to community follow-up, one continuous flow'}
        statement={locale === 'ie'
          ? 'Naoi gcéim, taifead oibríochtúil leanúnach amháin. Seo an turas iomlán a thaistealaíonn cónaitheoir tríd, agus an méid a dhéanann an córas ag gach céim.'
          : 'Nine stages, one continuous operational record. This is the complete journey a resident moves through, and what the system does at each stage.'}
      />

      {/* Principles row */}
      <section className="border-b border-surface-border bg-surface-raised">
        <div className="container-site py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: locale === 'ie' ? 'Gach gníomh taifeadta' : 'Every action recorded',
                body: locale === 'ie'
                  ? 'Cruthaíonn gach iontráil úsáideora rian iniúchta inleanúna.'
                  : 'Every user entry creates a traceable audit trail.',
              },
              {
                label: locale === 'ie' ? 'Sreafaí oibre struchtúrtha' : 'Structured workflows',
                body: locale === 'ie'
                  ? 'Ní ligeann foirmeacha do chéimeanna a chailleadh nó sonraí éigeantacha a fhágáil ar lár.'
                  : 'Forms do not allow steps to be skipped or mandatory fields omitted.',
              },
              {
                label: locale === 'ie' ? 'Iniúchtaí ag am ar bith' : 'Audits at any time',
                body: locale === 'ie'
                  ? 'Is féidir le cigirí rochtain a fháil ar thaifid chomhlíonta ag aon phointe.'
                  : 'Inspectors can access compliance records at any point.',
              },
              {
                label: locale === 'ie' ? 'Rólbhunaithe' : 'Role-based',
                body: locale === 'ie'
                  ? 'Tá rochtain ar fheidhmeanna nasctha le róil úsáideora atá sainmhínithe ag an tseirbhís.'
                  : 'Access to functions is tied to user roles defined by the service.',
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <p className="font-mono text-xs font-medium text-primary-700 mb-1">{label}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey stage sections */}
      {JOURNEY_STAGES.map(({ stage, labelEn, labelIe, descEn, descIe }, index) => {
        const steps = stepsByStage[stage] ?? [];
        return (
          <section key={stage} id={stage} className="border-b border-surface-border section-pad">
            <div className="container-site">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Description */}
                <div className="lg:col-span-2">
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
                    {locale === 'ie' ? `Céim ${index + 1} de 9` : `Stage ${index + 1} of 9`}
                  </p>
                  <h2 className="font-serif text-xl md:text-2xl text-primary-800 mb-3">
                    {locale === 'ie' ? labelIe : labelEn}
                  </h2>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {locale === 'ie' ? descIe : descEn}
                  </p>
                  {steps[0]?.relatedModule?.functionalSlug && (
                    <Link
                      href={`/${locale}/modules/${steps[0].relatedModule.functionalSlug}`}
                      className="mt-4 inline-flex text-sm font-medium text-primary-700 hover:text-primary-900"
                    >
                      {t(steps[0].relatedModule.title, locale)} →
                    </Link>
                  )}
                </div>
                {/* Diagram */}
                <div className="lg:col-span-3">
                  {steps.length > 0 ? (
                    <WorkflowDiagram steps={steps} locale={locale} />
                  ) : (
                    <div className="border border-dashed border-surface-border rounded p-6 text-center text-sm text-ink-muted">
                      {locale === 'ie' ? 'Céimeanna le cur leis sa CMS' : 'Steps to be added in CMS'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Next step */}
      <section className="section-pad">
        <div className="container-site">
          <div className="max-w-lg">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
              {locale === 'ie' ? 'An Chéad Chéim Eile' : 'Next Step'}
            </p>
            <h2 className="font-serif text-2xl text-primary-800">
              {locale === 'ie' ? 'Féach na modúil oibríochtúla' : 'Explore the operational modules'}
            </h2>
            <p className="mt-2 text-base text-ink-secondary">
              {locale === 'ie'
                ? 'Breathnaigh ar na gnéithe ar leith atá ar fáil, nó déan teagmháil chun plé a dhéanamh ar conas a oirfeadh sé do do sheirbhís.'
                : 'View the specific modules available, or get in touch to discuss how it would suit your service.'}
            </p>
            <div className="mt-5 flex gap-3">
              <Link href={`/${locale}/modules`} className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
                {locale === 'ie' ? 'Modúil →' : 'Modules →'}
              </Link>
              <Link href={`/${locale}/contact`} className="text-sm font-medium text-ink-muted hover:text-ink-secondary transition-colors">
                {locale === 'ie' ? 'Teagmháil →' : 'Contact →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
