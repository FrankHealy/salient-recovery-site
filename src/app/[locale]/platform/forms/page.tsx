// src/app/[locale]/platform/forms/page.tsx
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface Props { params: { locale: Locale } }

export default function FormsRedirect({ params: { locale } }: Props) {
  redirect(`/${locale}/modules/clinical-assessments`);
}
