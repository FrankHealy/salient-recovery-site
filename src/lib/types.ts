// src/lib/types.ts
import type { Locale } from './i18n';

// ─── Locale String ─────────────────────────────────────────────────────────────
export type LocaleString = Partial<Record<Locale, string>>;
export type LocaleText = Partial<Record<Locale, string>>;
export type LocaleBlock = Partial<Record<Locale, unknown[]>>;

// ─── Site Settings ─────────────────────────────────────────────────────────────
export interface SiteSettings {
  siteName: LocaleString;
  siteTagline: LocaleString;
  contactEmail: string;
  contactPhone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    country?: string;
    postcode?: string;
  };
  footerStatement: LocaleText;
  linkedinUrl?: string;
}

// ─── Navigation ────────────────────────────────────────────────────────────────
export interface NavChild {
  label: LocaleString;
  href: string;
}

export interface NavItem {
  _id: string;
  label: LocaleString;
  href: string;
  order: number;
  children?: NavChild[];
}

// ─── Platform Feature ──────────────────────────────────────────────────────────
export type SystemEntity = 'resident' | 'unit' | 'programme' | 'event' | 'incident' | 'audit' | 'form' | 'facility';

export interface PlatformFeature {
  _id: string;
  featureId: { current: string };
  title: LocaleString;
  shortDescription: LocaleText;
  associatedEntity: SystemEntity;
  capabilities?: { label: LocaleString }[];
  regulatoryRelevance?: string[];
  order?: number;
}

// ─── Workflow Step ─────────────────────────────────────────────────────────────
export type WorkflowType = 'admission' | 'incident' | 'audit' | 'programme' | 'discharge' | 'onboarding';
export type ActorType = 'clinician' | 'key-worker' | 'manager' | 'administrator' | 'system' | 'auditor';

export interface WorkflowStep {
  _id: string;
  stepNumber: number;
  workflowType: WorkflowType;
  title: LocaleString;
  description: LocaleText;
  actor: ActorType;
  systemAction: LocaleString;
}

// ─── Sector ────────────────────────────────────────────────────────────────────
export interface SectorPage {
  _id: string;
  slug: string;
  name: LocaleString;
  summary: LocaleText;
  regulatoryContext: LocaleText;
  applicableFeatures?: PlatformFeature[];
  order?: number;
}

// ─── Resources ────────────────────────────────────────────────────────────────
export type ResourceCategory = 'regulatory' | 'clinical' | 'platform' | 'policy' | 'sector';

export interface ResourceArticle {
  _id: string;
  slug: string;
  title: LocaleString;
  summary: LocaleText;
  body?: LocaleBlock;
  category: ResourceCategory;
  publishedAt: string;
  readingTimeMinutes?: number;
}

// ─── External Signal ──────────────────────────────────────────────────────────
export type SignalTopic = 'residential-care' | 'mental-health' | 'addiction-recovery' | 'regulatory' | 'digital-health' | 'workforce' | 'policy';

export interface ExternalSignal {
  _id: string;
  title: LocaleString;
  summary: LocaleText;
  sourceName: string;
  sourceUrl: string;
  publishedDate: string;
  topic: SignalTopic;
  region?: string;
  language?: string;
  relevanceNote?: LocaleText;
}

// ─── Weekly Digest ─────────────────────────────────────────────────────────────
export interface WeeklyDigest {
  _id: string;
  title: LocaleString;
  weekEnding: string;
  summary: LocaleText;
  signals?: ExternalSignal[];
  editorNote?: LocaleText;
}

// ─── Research Paper ────────────────────────────────────────────────────────────
export interface ResearchPaperSummary {
  _id: string;
  slug: string;
  paperTitle: string;
  authors?: string;
  journal?: string;
  publishedYear?: number;
  doi?: string;
  summary: LocaleText;
  relevanceNote?: LocaleText;
  topics?: string[];
}

// ─── Policy Update ─────────────────────────────────────────────────────────────
export interface PolicyUpdate {
  _id: string;
  slug: string;
  title: LocaleString;
  effectiveDate: string;
  issuingBody: string;
  summary: LocaleText;
  sourceUrl?: string;
  impactAssessment?: LocaleText;
  affectedSectors?: { slug: string; name: LocaleString }[];
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
export interface FaqItem {
  _id: string;
  question: LocaleString;
  answer: LocaleBlock;
  category: string;
  order?: number;
}

// ─── Compliance ────────────────────────────────────────────────────────────────
export interface ComplianceStatement {
  _id: string;
  framework: string;
  issuingBody?: string;
  statement: LocaleText;
  lastReviewedDate?: string;
  order?: number;
}
