import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { MaturityPoint } from '@/lib/types';

interface ProductMaturityProps {
  locale: Locale;
  points: MaturityPoint[];
}

export default function ProductMaturity({ locale, points }: ProductMaturityProps) {
  if (!points.length) return null;

  return (
    <section className="border-b border-surface-border section-pad">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
            {locale === 'ie' ? 'Aois an táirge' : 'Product maturity'}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
            {locale === 'ie' ? 'Ardán atá ag feidhmiú i ndáiríre' : 'A platform that is already operating in practice'}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {points.map((point) => (
            <div key={point._id} className="rounded border border-surface-border bg-surface-base p-6">
              <h3 className="font-serif text-lg text-primary-800">{t(point.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{t(point.description, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
