// src/app/[locale]/platform/audit-compliance/page.tsx
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface Props { params: { locale: Locale } }

export default function AuditComplianceRedirect({ params: { locale } }: Props) {
  redirect(`/${locale}/modules/reports`);
}
