// src/app/[locale]/platform/timeline/page.tsx
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface Props { params: { locale: Locale } }

export default function TimelineRedirect({ params: { locale } }: Props) {
  redirect(`/${locale}/modules/timeline`);
}
