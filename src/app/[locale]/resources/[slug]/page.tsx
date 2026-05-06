// src/app/[locale]/resources/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { RESOURCE_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import type { ResourceArticle } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t, tBlock } from '@/lib/i18n';
import PortableText from '@/components/content/PortableText';
import type { PortableTextBlock } from '@portabletext/types';

interface Props {
  params: { locale: Locale; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article: ResourceArticle | null = await client.fetch(RESOURCE_BY_SLUG_QUERY, { slug: params.slug });
  return {
    title: article ? t(article.title, params.locale) : 'Resource',
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  regulatory: 'Regulatory Guide',
  clinical: 'Clinical Practice',
  platform: 'Platform Documentation',
  policy: 'Policy Summary',
  sector: 'Sector Overview',
};

export default async function ResourceDetailPage({ params: { locale, slug } }: Props) {
  const article: ResourceArticle | null = await client.fetch(RESOURCE_BY_SLUG_QUERY, { slug });

  if (!article) notFound();

  const body = tBlock(article.body, locale) as PortableTextBlock[];

  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-6">
        <Link
          href={`/${locale}/resources`}
          className="text-xs font-mono text-ink-muted hover:text-ink-secondary transition-colors"
        >
          ← {locale === 'ie' ? 'Acmhainní' : 'Resources'}
        </Link>
      </div>

      <article className="max-w-2xl">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {article.category && (
            <span className="font-mono text-2xs uppercase tracking-widest text-ink-muted bg-surface-raised border border-surface-border rounded px-2 py-0.5">
              {CATEGORY_LABELS[article.category] ?? article.category}
            </span>
          )}
          {article.publishedAt && (
            <span className="font-mono text-2xs text-ink-muted">
              {new Date(article.publishedAt).toLocaleDateString('en-IE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
          {article.readingTimeMinutes && (
            <span className="font-mono text-2xs text-ink-muted">
              {article.readingTimeMinutes} min read
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-primary-800 leading-tight mb-4">
          {t(article.title, locale)}
        </h1>

        {t(article.summary, locale) && (
          <p className="text-base text-ink-secondary leading-relaxed border-l-2 border-primary-200 pl-4 mb-8">
            {t(article.summary, locale)}
          </p>
        )}

        {body.length > 0 && (
          <PortableText value={body} />
        )}
      </article>
    </div>
  );
}
