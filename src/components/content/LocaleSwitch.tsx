// src/components/content/LocaleSwitch.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Route } from 'next';
import type { Locale } from '@/lib/i18n';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n';

interface Props {
  currentLocale: Locale;
}

export default function LocaleSwitch({ currentLocale }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: Locale) => {
    if (next === currentLocale) return;
    // Replace the locale segment in the current path
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') as Route);
  };

  return (
    <div className="flex items-center gap-0.5 border border-surface-border rounded p-0.5 bg-surface-raised">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`
            px-2 py-1 text-xs font-mono rounded transition-colors duration-200
            ${locale === currentLocale
              ? 'bg-primary-700 text-ink-inverse'
              : 'text-ink-muted hover:text-ink-primary'}
          `}
          aria-current={locale === currentLocale ? 'true' : undefined}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
