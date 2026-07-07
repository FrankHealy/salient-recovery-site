import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { Differentiator } from '@/lib/types';

interface DifferentiatorsProps {
  locale: Locale;
  items: Differentiator[];
}

export default function Differentiators({ locale, items }: DifferentiatorsProps) {
  if (!items.length) return null;

  return (
    <section className="border-b border-surface-border section-pad bg-surface-raised">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
            {locale === 'ie' ? 'Idirdhealú' : 'Differentiators'}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
            {locale === 'ie' ? 'Cineál oibríochtúil atá bunaithe ar fhíor-sreafaí' : 'Built around real recovery workflows'}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="rounded border border-surface-border bg-surface-base p-6">
              <h3 className="font-serif text-lg text-primary-800">{t(item.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{t(item.description, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
