// src/app/[locale]/how-it-works/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { ALL_WORKFLOW_STEPS_QUERY } from '@/lib/sanity/queries';
import type { WorkflowStep, WorkflowType } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { PageHero, SectionHeader } from '@/components/ui/index';
import WorkflowDiagram from '@/components/ui/WorkflowDiagram';

interface Props { params: { locale: Locale } }

export const metadata: Metadata = { title: 'How it Works' };

const WORKFLOW_SECTIONS: { type: WorkflowType; labelEn: string; labelIe: string; descEn: string; descIe: string }[] = [
  {
    type: 'onboarding',
    labelEn: 'Platform Onboarding',
    labelIe: 'Bordáil an Ardáin',
    descEn: 'How a service is set up within the Acutis platform, including facility configuration, user provisioning, and initial audit.',
    descIe: 'Conas a chuirtear seirbhís ar bun laistigh den ardán Acutis, lena n-áirítear cumraíocht áise, soláthar úsáideoirí, agus iniúchadh tosaigh.',
  },
  {
    type: 'admission',
    labelEn: 'Resident Admission',
    labelIe: 'Ionanálú Cónaitheora',
    descEn: 'The sequence from referral to admission completion — covering assessment, consent, risk documentation, and unit allocation.',
    descIe: 'An seicheamh ó atreorú go dtí críochnú ionanálaithe — ag clúdach measúnachta, toilithe, doiciméadú riosca, agus leithdháileadh aonaid.',
  },
  {
    type: 'incident',
    labelEn: 'Incident Reporting',
    labelIe: 'Tuairisciú Teagmhas',
    descEn: 'How incidents are recorded, categorised, escalated, reviewed, and closed within the system.',
    descIe: 'Conas a thaifeadtar, a chatagóraítear, a ardaítear, a athbhreithnítear agus a dhúntar teagmhais laistigh den chóras.',
  },
  {
    type: 'audit',
    labelEn: 'Audit Process',
    labelIe: 'Próiseas Iniúchta',
    descEn: 'Internal and external audit workflows — from preparation through to report generation and action plan tracking.',
    descIe: 'Sreafaí oibre iniúchta inmheánacha agus seachtracha — ó ullmhúchán go dtí giniúint tuairisce agus rianú plean gníomhaíochta.',
  },
  {
    type: 'discharge',
    labelEn: 'Discharge',
    labelIe: 'Urscaoileadh',
    descEn: 'Planned and unplanned discharge documentation, handover records, and post-discharge referral.',
    descIe: 'Doiciméadú urscaoilte pleanáilte agus neamhphleanáilte, taifid aistrithe, agus atreorú iar-urscaoilte.',
  },
];

export default async function HowItWorksPage({ params: { locale } }: Props) {
  const allSteps: WorkflowStep[] = await client.fetch(ALL_WORKFLOW_STEPS_QUERY);

  const stepsByType = allSteps.reduce<Record<string, WorkflowStep[]>>((acc, step) => {
    if (!acc[step.workflowType]) acc[step.workflowType] = [];
    acc[step.workflowType].push(step);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Conas a Oibríonn' : 'How it Works'}
        heading={locale === 'ie' ? 'Sreafaí oibre oibríochta' : 'Operational workflows'}
        statement={locale === 'ie'
          ? 'Léiríonn na sreafaí oibre seo a leanas conas a oibríonn an córas i gcomhthéacsanna oibríochta coitianta laistigh de sheirbhísí cúraim rialáilte.'
          : 'The following workflows show how the system operates across common operational contexts within regulated care services.'}
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

      {/* Workflow sections */}
      {WORKFLOW_SECTIONS.map(({ type, labelEn, labelIe, descEn, descIe }) => {
        const steps = stepsByType[type] ?? [];
        return (
          <section key={type} id={type} className="border-b border-surface-border section-pad">
            <div className="container-site">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Description */}
                <div className="lg:col-span-2">
                  <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
                    {locale === 'ie' ? 'Sruth Oibre' : 'Workflow'}
                  </p>
                  <h2 className="font-serif text-xl md:text-2xl text-primary-800 mb-3">
                    {locale === 'ie' ? labelIe : labelEn}
                  </h2>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {locale === 'ie' ? descIe : descEn}
                  </p>
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
              {locale === 'ie' ? 'Féach ar an ardán' : 'Explore the platform'}
            </h2>
            <p className="mt-2 text-base text-ink-secondary">
              {locale === 'ie'
                ? 'Breathnaigh ar na gnéithe ar leith atá ar fáil, nó déan teagmháil chun plé a dhéanamh ar conas a oirfeadh sé do do sheirbhís.'
                : 'View the specific features available, or get in touch to discuss how it would suit your service.'}
            </p>
            <div className="mt-5 flex gap-3">
              <Link href={`/${locale}/platform`} className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
                {locale === 'ie' ? 'Ardán →' : 'Platform →'}
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
