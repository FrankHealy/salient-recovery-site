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

export interface ProductScreenshot {
  _id: string;
  title: LocaleString;
  image?: { asset?: { url?: string } };
  alt: LocaleString;
  caption?: LocaleText;
  moduleLabel?: LocaleString;
  moduleReference?: {
    _id?: string;
    title?: LocaleString;
    functionalSlug?: string;
    businessOverview?: LocaleText;
    featureList?: Partial<Record<Locale, string[]>>;
  };
  displayOrder?: number;
  isFeatured?: boolean;
  carouselGroup?: string;
  deviceType?: 'Desktop' | 'Tablet';
}

export interface ProductModule {
  _id: string;
  title: LocaleString;
  slug?: { current?: string };
  functionalSlug?: string;
  summary: LocaleText;
  businessOverview?: LocaleText;
  featureList?: Partial<Record<Locale, string[]>>;
  typicalWorkflow?: Partial<Record<Locale, string[]>>;
  relatedModules?: ProductModule[];
  usesPlatformCapabilities?: PlatformCapability[];
  heroImage?: { asset?: { url?: string } };
  heroScreenshot?: { asset?: { url?: string } } | ProductScreenshot;
  displayOrder?: number;
  ctaLabel?: LocaleString;
  ctaLink?: string;
}

export interface PlatformCapability {
  _id: string;
  capabilityId?: { current?: string };
  title: LocaleString;
  shortDescription: LocaleText;
  technicalDetail?: LocaleText;
  category: string;
  order?: number;
}

export interface ProductLinePage {
  _id: string;
  title: LocaleString;
  slug?: { current?: string };
  heroStatement: LocaleText;
  overview?: LocaleText;
  heroImage?: { asset?: { url?: string } };
  relatedModules?: ProductModule[];
  ctaLabel?: LocaleString;
  ctaLink?: string;
  order?: number;
}

export interface ProblemCard {
  _id: string;
  title: LocaleString;
  description: LocaleText;
  displayOrder?: number;
}

export interface Differentiator {
  _id: string;
  title: LocaleString;
  description: LocaleText;
  displayOrder?: number;
}

export interface MaturityPoint {
  _id: string;
  title: LocaleString;
  description: LocaleText;
  displayOrder?: number;
}

export interface HomepageSettings {
  _id: string;
  heroHeadline?: LocaleString;
  heroSubheadline?: LocaleText;
  screenshotCarousel?: ProductScreenshot[];
  productModules?: ProductModule[];
  problemCards?: ProblemCard[];
  differentiators?: Differentiator[];
  maturityPoints?: MaturityPoint[];
  ctaHeadline?: LocaleString;
  ctaText?: LocaleText;
  ctaEmail?: string;
  primaryCtaLabel?: LocaleString;
  primaryCtaLink?: string;
  secondaryCtaLabel?: LocaleString;
  secondaryCtaLink?: string;
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

// ─── Module Capability (Sanity type: platformFeature) ─────────────────────────
export type FunctionalModuleSlug =
  | 'admissions' | 'residents' | 'clinical-assessments' | 'group-therapy' | 'incident-management'
  | 'timeline' | 'care-planning' | 'community-services' | 'reports';

export interface PlatformFeature {
  _id: string;
  featureId: { current: string };
  title: LocaleString;
  businessValueSummary: LocaleText;
  shortDescription?: LocaleText;
  associatedModule: FunctionalModuleSlug;
  capabilities?: { label: LocaleString }[];
  order?: number;
}

// ─── Workflow Step ─────────────────────────────────────────────────────────────
export type JourneyStage =
  | 'admission' | 'assessment' | 'resident-management' | 'daily-operations' | 'group-therapy'
  | 'incident-reporting' | 'progress-monitoring' | 'discharge' | 'community-follow-up';
export type ActorType = 'clinician' | 'key-worker' | 'manager' | 'administrator' | 'system' | 'auditor';

export interface WorkflowStep {
  _id: string;
  stepNumber: number;
  journeyStage: JourneyStage;
  title: LocaleString;
  description: LocaleText;
  actor: ActorType;
  systemAction: LocaleString;
  relatedModule?: { _id?: string; title?: LocaleString; functionalSlug?: string };
}

// ─── Sector ────────────────────────────────────────────────────────────────────
export interface SectorPage {
  _id: string;
  slug: string;
  name: LocaleString;
  summary: LocaleText;
  regulatoryContext: LocaleText;
  applicableFeatures?: PlatformFeature[];
  applicablePlatformCapabilities?: PlatformCapability[];
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
