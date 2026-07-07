import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { ProblemCard } from '@/lib/types';

interface ProblemCardsProps {
  locale: Locale;
  cards: ProblemCard[];
}

export default function ProblemCards({ locale, cards }: ProblemCardsProps) {
  if (!cards.length) return null;

  return (
    <section className="border-b border-surface-border section-pad">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">
            {locale === 'ie' ? 'An fhadhb' : 'The problem'}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-primary-800">
            {locale === 'ie' ? 'Bíonn seirbhísí athshlánaithe ag oibriú ar chórais ilroinnte' : 'Recovery services run on fragmented systems'}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card._id} className="rounded border border-surface-border bg-surface-base p-6">
              <h3 className="font-serif text-lg text-primary-800">{t(card.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{t(card.description, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
