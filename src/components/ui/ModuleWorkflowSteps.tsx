interface ModuleWorkflowStepsProps {
  steps: string[];
}

export default function ModuleWorkflowSteps({ steps }: ModuleWorkflowStepsProps) {
  if (!steps.length) return null;

  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3 rounded border border-surface-border bg-surface-base p-5">
          <span className="font-mono text-sm text-primary-600 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm text-ink-secondary leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}
