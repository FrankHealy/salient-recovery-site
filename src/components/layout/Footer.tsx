// src/components/layout/Footer.tsx
import Link from 'next/link';
import type { NavItem, SiteSettings } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';

interface Props {
  navItems: NavItem[];
  settings: SiteSettings | null;
  locale: Locale;
}

export default function Footer({ navItems, settings, locale }: Props) {
  const statement = t(settings?.footerStatement, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-ink-inverse/80 mt-auto">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <p className="font-serif text-lg text-ink-inverse mb-3">
              Salient Recovery
            </p>
            {settings?.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-sm hover:text-ink-inverse transition-colors"
              >
                {settings.contactEmail}
              </a>
            )}
            {settings?.address && (
              <address className="not-italic text-sm mt-3 space-y-0.5 text-ink-inverse/60">
                {settings.address.line1 && <p>{settings.address.line1}</p>}
                {settings.address.city && <p>{settings.address.city}</p>}
                {settings.address.country && <p>{settings.address.country}</p>}
              </address>
            )}
          </div>

          {/* Nav column */}
          <div className="col-span-1">
            <p className="font-mono text-2xs uppercase tracking-widest text-ink-inverse/40 mb-4">
              {locale === 'ie' ? 'Nascleanúint' : 'Navigation'}
            </p>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item._id}
                  href={`/${locale}${item.href}`}
                  className="text-sm hover:text-ink-inverse transition-colors duration-200"
                >
                  {t(item.label, locale)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Statement column */}
          <div className="col-span-1">
            {statement && (
              <>
                <p className="font-mono text-2xs uppercase tracking-widest text-ink-inverse/40 mb-4">
                  {locale === 'ie' ? 'Ráiteas Rialála' : 'Regulatory Statement'}
                </p>
                <p className="text-xs leading-relaxed text-ink-inverse/60">
                  {statement}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-ink-inverse/40 font-mono">
            © {year} Salient Recovery. {locale === 'ie' ? 'Gach ceart ar cosaint.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-4 text-xs text-ink-inverse/40">
            <Link href={`/${locale}/privacy`} className="hover:text-ink-inverse/70 transition-colors">
              {locale === 'ie' ? 'Príobháideacht' : 'Privacy'}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-ink-inverse/70 transition-colors">
              {locale === 'ie' ? 'Téarmaí' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
