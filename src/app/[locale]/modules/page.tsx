// src/app/[locale]/modules/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { ALL_MODULES_QUERY } from '@/lib/sanity/queries';
import type { ProductModule } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { PageHero } from '@/components/ui/index';
import ProductModuleGrid from '@/components/ui/ProductModuleGrid';

interface Props {
  params: { locale: Locale };
}

export const metadata: Metadata = { title: 'Modules' };

export default async function ModulesPage({ params: { locale } }: Props) {
  const modules: ProductModule[] = await client.fetch(ALL_MODULES_QUERY);

  return (
    <>
      <PageHero
        eyebrow={locale === 'ie' ? 'Modúil' : 'Modules'}
        heading={locale === 'ie' ? 'Naoi réimse oibríochtúla, ardán amháin' : 'Nine operational areas, one platform'}
        statement={locale === 'ie'
          ? 'Ó iontráil go leantóireacht phobail, tacaíonn gach modúl le céim ar leith den turas oibríochtúil — struchtúrtha, inrianaithe agus réidh le haghaidh cigireachta.'
          : 'From admission through to community follow-up, each module supports a distinct stage of the operational journey — structured, traceable, and inspection-ready.'}
      />
      <section className="section-pad">
        <div className="container-site">
          <ProductModuleGrid locale={locale} modules={modules} />
        </div>
      </section>
    </>
  );
}
