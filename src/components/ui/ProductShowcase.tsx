import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { ProductModule } from '@/lib/types';

interface ProductShowcaseProps {
  locale: Locale;
  modules: ProductModule[];
}

export default function ProductShowcase({ locale, modules }: ProductShowcaseProps) {
  const featured = modules.slice(0, 3);

  if (!featured.length) return null;

  return (
    <section className="border-b border-surface-border section-pad">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
            {locale === 'ie' ? 'Ábhar oibríochtúil' : 'Operational scope'}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
            {locale === 'ie' ? 'Acutis i ngníomhaíocht' : 'Acutis in practice'}
          </h2>
          <p className="mt-3 text-base text-ink-secondary leading-relaxed">
            {locale === 'ie'
              ? 'Tá na modúil ar fáil mar shraith de shreafaí oibríochta a thacaíonn le hiontráil, socrúcháin, sláinteachas, nótaí agus iar-chúram i gcomhthéacsanna cónaitheacha agus pobail.'
              : 'The modules support a continuous operational workflow across residential and community care, from admissions through later-stage aftercare.'}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featured.map((module) => (
            <div key={module._id} className="rounded border border-surface-border bg-surface-base p-6">
              <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted">{t(module.title, locale)}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{t(module.businessOverview, locale) || t(module.summary, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
