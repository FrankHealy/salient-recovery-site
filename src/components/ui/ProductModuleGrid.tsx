import Link from 'next/link';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { ProductModule } from '@/lib/types';

interface ProductModuleGridProps {
  locale: Locale;
  modules: ProductModule[];
}

export default function ProductModuleGrid({ locale, modules }: ProductModuleGridProps) {
  if (!modules.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <article key={module._id} className="flex h-full flex-col rounded border border-surface-border bg-surface-base p-6">
          {module.heroImage?.asset?.url && (
            <img src={module.heroImage.asset.url} alt={t(module.title, locale)} className="mb-5 h-40 w-full rounded object-cover" />
          )}
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted">
            {locale === 'ie' ? 'Modúl' : 'Module'}
          </p>
          <h3 className="mt-2 font-serif text-xl text-primary-800">{t(module.title, locale)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{t(module.summary, locale)}</p>

          {module.featureList && module.featureList[locale] && module.featureList[locale]!.length > 0 && (
            <ul className="mt-5 flex flex-1 flex-col gap-2">
              {module.featureList[locale]!.slice(0, 4).map((feature, index) => (
                <li key={`${module._id}-${index}`} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-primary-300 bg-primary-50" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {module.functionalSlug && (
            <Link
              href={`/${locale}/modules/${module.functionalSlug}`}
              className="mt-6 inline-flex text-sm font-medium text-primary-700 hover:text-primary-900"
            >
              {locale === 'ie' ? 'Foghlaim Tuilleadh' : 'Learn More'} →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
