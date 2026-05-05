// src/components/ui/PageHero.tsx
import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  statement?: string;
  children?: ReactNode;
  constrained?: boolean;
}

export function PageHero({ eyebrow, heading, statement, children, constrained = true }: PageHeroProps) {
  return (
    <section className="border-b border-surface-border bg-surface-base">
      <div className="container-site py-12 md:py-16">
        {eyebrow && (
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className={`font-serif text-3xl md:text-4xl text-primary-800 leading-tight ${constrained ? 'max-w-2xl' : ''}`}>
          {heading}
        </h1>
        {statement && (
          <p className={`mt-4 text-base md:text-lg text-ink-secondary leading-relaxed ${constrained ? 'max-w-prose-tight' : ''}`}>
            {statement}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

// src/components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, heading, body, align = 'left' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`mb-10 ${alignClass}`}>
      {eyebrow && (
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-serif text-2xl md:text-3xl text-primary-800 leading-snug ${align === 'center' ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>
        {heading}
      </h2>
      {body && (
        <p className={`mt-3 text-base text-ink-secondary leading-relaxed ${align === 'center' ? 'max-w-prose-tight mx-auto' : 'max-w-prose-tight'}`}>
          {body}
        </p>
      )}
    </div>
  );
}

// src/components/ui/FeatureBlock.tsx
interface FeatureBlockProps {
  entity: string;
  title: string;
  description: string;
  capabilities?: string[];
  regulatoryRelevance?: string[];
}

export function FeatureBlock({ entity, title, description, capabilities, regulatoryRelevance }: FeatureBlockProps) {
  return (
    <div className="border border-surface-border rounded bg-surface-base p-6 flex flex-col gap-4 hover:border-primary-300 transition-colors duration-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-muted">
            {entity}
          </span>
          <h3 className="font-serif text-lg text-primary-800 mt-1">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed">{description}</p>
      {capabilities && capabilities.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {capabilities.map((cap, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
              <span className="mt-1 w-3 h-3 shrink-0 rounded-full border border-primary-300 bg-primary-50" aria-hidden="true" />
              {cap}
            </li>
          ))}
        </ul>
      )}
      {regulatoryRelevance && regulatoryRelevance.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-surface-border">
          {regulatoryRelevance.map((r) => (
            <span key={r} className="font-mono text-2xs uppercase tracking-wide px-2 py-0.5 bg-surface-raised border border-surface-border rounded text-ink-muted">
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// src/components/ui/ResourceCard.tsx
import Link from 'next/link';

interface ResourceCardProps {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt?: string;
  readingTime?: number;
  locale: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  regulatory: 'Regulatory',
  clinical: 'Clinical',
  platform: 'Platform',
  policy: 'Policy',
  sector: 'Sector',
};

export function ResourceCard({ slug, title, summary, category, publishedAt, readingTime, locale }: ResourceCardProps) {
  return (
    <Link
      href={`/${locale}/resources/${slug}`}
      className="block border border-surface-border rounded p-5 hover:border-primary-300 transition-colors duration-200 group"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-muted">
          {CATEGORY_LABELS[category] ?? category}
        </span>
        {publishedAt && (
          <>
            <span className="text-surface-border">·</span>
            <span className="font-mono text-2xs text-ink-muted">
              {new Date(publishedAt).toLocaleDateString('en-IE', { year: 'numeric', month: 'short' })}
            </span>
          </>
        )}
        {readingTime && (
          <>
            <span className="text-surface-border">·</span>
            <span className="font-mono text-2xs text-ink-muted">{readingTime} min read</span>
          </>
        )}
      </div>
      <h3 className="font-serif text-base text-primary-800 leading-snug group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-secondary leading-relaxed line-clamp-2">{summary}</p>
    </Link>
  );
}

// src/components/ui/ExternalSignalCard.tsx
interface ExternalSignalCardProps {
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  publishedDate: string;
  topic: string;
  region?: string;
  relevanceNote?: string;
}

const TOPIC_LABELS: Record<string, string> = {
  'residential-care': 'Residential Care',
  'mental-health': 'Mental Health',
  'addiction-recovery': 'Addiction Recovery',
  'regulatory': 'Regulatory',
  'digital-health': 'Digital Health',
  'workforce': 'Workforce',
  'policy': 'Policy',
};

export function ExternalSignalCard({
  title, summary, sourceName, sourceUrl, publishedDate, topic, region, relevanceNote,
}: ExternalSignalCardProps) {
  return (
    <article className="border border-surface-border rounded p-5 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-muted bg-surface-raised px-2 py-0.5 rounded border border-surface-border">
          {TOPIC_LABELS[topic] ?? topic}
        </span>
        {region && (
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-muted">{region}</span>
        )}
        <span className="font-mono text-2xs text-ink-muted ml-auto">
          {new Date(publishedDate).toLocaleDateString('en-IE', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      </div>
      <div>
        <h3 className="font-serif text-base text-primary-800 leading-snug">{title}</h3>
        <p className="mt-1 text-sm text-ink-secondary leading-relaxed">{summary}</p>
      </div>
      {relevanceNote && (
        <div className="pt-2 border-t border-surface-border">
          <p className="text-xs text-ink-muted italic">{relevanceNote}</p>
        </div>
      )}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-ink-muted font-mono">{sourceName}</span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-primary-600 hover:text-primary-800 transition-colors"
        >
          View source →
        </a>
      </div>
    </article>
  );
}

// src/components/ui/ComplianceBadge.tsx
interface ComplianceBadgeProps {
  framework: string;
  issuingBody?: string;
  statement: string;
  lastReviewedDate?: string;
}

export function ComplianceBadge({ framework, issuingBody, statement, lastReviewedDate }: ComplianceBadgeProps) {
  return (
    <div className="border-l-2 border-primary-600 pl-4 py-1">
      <div className="flex flex-wrap items-baseline gap-2 mb-1">
        <span className="font-mono text-xs font-medium text-primary-700">{framework}</span>
        {issuingBody && (
          <span className="text-xs text-ink-muted">/ {issuingBody}</span>
        )}
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed">{statement}</p>
      {lastReviewedDate && (
        <p className="text-xs text-ink-muted mt-1 font-mono">
          Reviewed: {new Date(lastReviewedDate).toLocaleDateString('en-IE', { year: 'numeric', month: 'long' })}
        </p>
      )}
    </div>
  );
}
