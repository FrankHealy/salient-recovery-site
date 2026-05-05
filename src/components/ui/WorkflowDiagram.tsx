// src/components/ui/WorkflowDiagram.tsx
import type { WorkflowStep, ActorType } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';

interface Props {
  steps: WorkflowStep[];
  locale: Locale;
}

const ACTOR_LABELS: Record<ActorType, string> = {
  clinician: 'Clinician',
  'key-worker': 'Key Worker',
  manager: 'Manager',
  administrator: 'Administrator',
  system: 'System',
  auditor: 'Auditor',
};

const ACTOR_COLOUR: Record<ActorType, string> = {
  clinician: 'bg-blue-50 border-blue-200 text-blue-700',
  'key-worker': 'bg-emerald-50 border-emerald-200 text-emerald-700',
  manager: 'bg-amber-50 border-amber-200 text-amber-700',
  administrator: 'bg-slate-50 border-slate-200 text-slate-700',
  system: 'bg-primary-50 border-primary-200 text-primary-700',
  auditor: 'bg-purple-50 border-purple-200 text-purple-700',
};

export default function WorkflowDiagram({ steps, locale }: Props) {
  return (
    <div className="relative">
      {/* Vertical connector */}
      <div
        className="absolute left-5 top-6 bottom-6 w-px bg-surface-border"
        aria-hidden="true"
      />

      <ol className="relative flex flex-col gap-0">
        {steps.map((step, idx) => {
          const actorColour = ACTOR_COLOUR[step.actor] ?? 'bg-surface-raised border-surface-border text-ink-muted';
          const isLast = idx === steps.length - 1;
          return (
            <li
              key={step._id}
              className={`relative flex gap-5 ${isLast ? 'pb-0' : 'pb-6'}`}
            >
              {/* Step number bubble */}
              <div
                className="shrink-0 w-10 h-10 rounded-full bg-primary-800 text-ink-inverse
                           flex items-center justify-center font-mono text-sm font-medium z-10 mt-0.5"
                aria-hidden="true"
              >
                {step.stepNumber}
              </div>

              <div className="flex-1 pb-2">
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-sans font-semibold text-sm text-ink-primary">
                    {t(step.title, locale)}
                  </h3>
                  {step.actor && (
                    <span className={`font-mono text-2xs uppercase tracking-wide px-2 py-0.5 border rounded ${actorColour}`}>
                      {ACTOR_LABELS[step.actor] ?? step.actor}
                    </span>
                  )}
                </div>

                {/* Description */}
                {t(step.description, locale) && (
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {t(step.description, locale)}
                  </p>
                )}

                {/* System action */}
                {t(step.systemAction, locale) && (
                  <p className="mt-2 text-xs font-mono text-primary-600 bg-primary-50 border border-primary-100 rounded px-3 py-1.5 inline-block">
                    System: {t(step.systemAction, locale)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
