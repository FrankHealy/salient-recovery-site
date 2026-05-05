// src/components/content/PortableText.tsx
import { PortableText as SanityPortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

interface Props {
  value: PortableTextBlock[];
  className?: string;
}

export default function PortableText({ value, className }: Props) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;

  return (
    <div className={`prose-salient ${className ?? ''}`}>
      <SanityPortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => <p>{children}</p>,
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-primary-300 pl-4 italic text-ink-secondary">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => <ul>{children}</ul>,
            number: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold text-ink-primary">{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            code: ({ children }) => (
              <code className="font-mono text-sm bg-surface-raised px-1.5 py-0.5 rounded border border-surface-border">
                {children}
              </code>
            ),
            link: ({ value: v, children }) => (
              <a href={v?.href} target={v?.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  );
}
