// src/app/[locale]/platform/facility-mapping/page.tsx
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface Props { params: { locale: Locale } }

export default function FacilityMappingRedirect({ params: { locale } }: Props) {
  redirect(`/${locale}/modules/residents`);
}
