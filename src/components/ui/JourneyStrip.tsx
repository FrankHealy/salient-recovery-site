import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface JourneyStripProps {
  locale: Locale;
}

const STAGES: { en: string; ie: string }[] = [
  { en: 'Admission', ie: 'Iontráil' },
  { en: 'Assessment', ie: 'Measúnú' },
  { en: 'Resident Management', ie: 'Bainistíocht Cónaitheoirí' },
  { en: 'Daily Operations', ie: 'Oibríochtaí Laethúla' },
  { en: 'Group Therapy', ie: 'Teiripe Grúpa' },
  { en: 'Incident Reporting', ie: 'Tuairisciú Teagmhas' },
  { en: 'Progress Monitoring', ie: 'Monatóireacht Dul Chun Cinn' },
  { en: 'Discharge', ie: 'Scaoileadh' },
  { en: 'Community Follow-up', ie: 'Leantóireacht Phobail' },
];

export default function JourneyStrip({ locale }: JourneyStripProps) {
  return (
    <section className="border-b border-surface-border bg-surface-raised">
      <div className="container-site py-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted">
            {locale === 'ie' ? 'An turas oibríochtúil' : 'The operational journey'}
          </p>
          <Link
            href={`/${locale}/how-it-works`}
            className="text-sm font-medium text-primary-700 hover:text-primary-900 whitespace-nowrap"
          >
            {locale === 'ie' ? 'Féach conas a oibríonn sé →' : 'See how it works →'}
          </Link>
        </div>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {STAGES.map((stage, index) => (
            <li key={stage.en} className="flex items-center gap-2">
              <span className="whitespace-nowrap rounded-full border border-surface-border bg-surface-base px-3 py-1.5 text-xs font-medium text-ink-secondary">
                {locale === 'ie' ? stage.ie : stage.en}
              </span>
              {index < STAGES.length - 1 && (
                <span className="text-ink-muted" aria-hidden="true">→</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
