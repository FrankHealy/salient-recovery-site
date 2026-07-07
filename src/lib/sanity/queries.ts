// sanity/queries.ts
import { groq } from 'next-sanity';
import { HOMEPAGE_SETTINGS_FRAGMENT } from './homepage';

// ─── Site Settings ────────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteTagline,
    contactEmail,
    contactPhone,
    address,
    footerStatement,
    linkedinUrl
  }
`;

export const HOMEPAGE_SETTINGS_QUERY = groq`
  *[_type == "homepageSettings"][0] {
    ${HOMEPAGE_SETTINGS_FRAGMENT}
  }
`;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS_QUERY = groq`
  *[_type == "navigationItem"] | order(order asc) {
    _id,
    label,
    href,
    order,
    children[] { label, href }
  }
`;

// ─── Module Capabilities (Sanity type: platformFeature) ───────────────────────
export const MODULE_CAPABILITIES_BY_MODULE_QUERY = groq`
  *[_type == "platformFeature" && associatedModule == $module] | order(order asc) {
    _id,
    featureId,
    title,
    businessValueSummary,
    shortDescription,
    associatedModule,
    capabilities[]{ label },
    order
  }
`;

// ─── Platform Capabilities (true platform/infrastructure concepts) ────────────
export const ALL_PLATFORM_CAPABILITIES_QUERY = groq`
  *[_type == "platformCapability"] | order(order asc) {
    _id,
    capabilityId,
    title,
    shortDescription,
    technicalDetail,
    category,
    order
  }
`;

// ─── Product Modules (the 9 functional modules) ───────────────────────────────
export const ALL_MODULES_QUERY = groq`
  *[_type == "productModule"] | order(displayOrder asc) {
    _id,
    title,
    functionalSlug,
    summary,
    businessOverview,
    featureList,
    heroScreenshot->{ image{asset->{url}}, alt },
    displayOrder
  }
`;

export const MODULE_BY_SLUG_QUERY = groq`
  *[_type == "productModule" && functionalSlug == $slug][0] {
    _id,
    title,
    functionalSlug,
    summary,
    businessOverview,
    featureList,
    typicalWorkflow,
    heroScreenshot->{ image{asset->{url}}, alt, caption },
    relatedModules[]->{ _id, title, functionalSlug, summary },
    usesPlatformCapabilities[]->{ _id, title, category },
    "capabilities": *[_type == "platformFeature" && associatedModule == ^.functionalSlug] | order(order asc) {
      _id, title, businessValueSummary, shortDescription, capabilities[]{ label }
    }
  }
`;

// ─── Product Line Pages (Centre / Community) ──────────────────────────────────
export const PRODUCT_LINE_BY_SLUG_QUERY = groq`
  *[_type == "productLinePage" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    heroStatement,
    overview,
    heroImage{asset->{url}},
    relatedModules[]->{ _id, title, functionalSlug, summary, businessOverview, featureList },
    ctaLabel,
    ctaLink
  }
`;

// ─── Workflow Steps (the 9-stage operational journey) ─────────────────────────
export const JOURNEY_STAGE_STEPS_QUERY = groq`
  *[_type == "workflowStep" && journeyStage == $journeyStage] | order(stepNumber asc) {
    _id,
    stepNumber,
    journeyStage,
    title,
    description,
    actor,
    systemAction,
    relatedModule->{ _id, title, functionalSlug }
  }
`;

export const ALL_WORKFLOW_STEPS_QUERY = groq`
  *[_type == "workflowStep"] | order(stepNumber asc) {
    _id,
    stepNumber,
    journeyStage,
    title,
    description,
    actor,
    systemAction,
    relatedModule->{ _id, title, functionalSlug }
  }
`;

// ─── Sector Pages ─────────────────────────────────────────────────────────────
export const ALL_SECTORS_QUERY = groq`
  *[_type == "sectorPage"] | order(order asc) {
    _id,
    "slug": slug.current,
    name,
    summary,
    regulatoryContext,
    applicableFeatures[]->{ _id, featureId, title, shortDescription, associatedModule },
    applicablePlatformCapabilities[]->{ _id, title, category },
    order
  }
`;

export const SECTOR_BY_SLUG_QUERY = groq`
  *[_type == "sectorPage" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name,
    summary,
    regulatoryContext,
    applicableFeatures[]->{ _id, featureId, title, shortDescription, associatedModule, capabilities[]{ label } },
    applicablePlatformCapabilities[]->{ _id, title, shortDescription, category }
  }
`;

// ─── Resources ────────────────────────────────────────────────────────────────
export const ALL_RESOURCES_QUERY = groq`
  *[_type == "resourceArticle"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    summary,
    category,
    publishedAt,
    readingTimeMinutes
  }
`;

export const RESOURCE_BY_SLUG_QUERY = groq`
  *[_type == "resourceArticle" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    summary,
    body,
    category,
    publishedAt,
    readingTimeMinutes
  }
`;

// ─── External Signals ─────────────────────────────────────────────────────────
export const REVIEWED_SIGNALS_QUERY = groq`
  *[_type == "externalSignal" && isReviewed == true] | order(publishedDate desc) {
    _id,
    title,
    summary,
    sourceName,
    sourceUrl,
    publishedDate,
    topic,
    region,
    language,
    relevanceNote
  }
`;

export const SIGNALS_BY_TOPIC_QUERY = groq`
  *[_type == "externalSignal" && isReviewed == true && topic == $topic] | order(publishedDate desc) [0..9] {
    _id,
    title,
    summary,
    sourceName,
    sourceUrl,
    publishedDate,
    topic,
    region,
    relevanceNote
  }
`;

// ─── Weekly Digest ────────────────────────────────────────────────────────────
export const LATEST_DIGEST_QUERY = groq`
  *[_type == "weeklyDigest" && isPublished == true] | order(weekEnding desc) [0] {
    _id,
    title,
    weekEnding,
    summary,
    signals[]->{ _id, title, sourceName, sourceUrl, publishedDate, topic },
    editorNote
  }
`;

export const ALL_DIGESTS_QUERY = groq`
  *[_type == "weeklyDigest" && isPublished == true] | order(weekEnding desc) {
    _id,
    title,
    weekEnding,
    summary
  }
`;

// ─── Research Papers ──────────────────────────────────────────────────────────
export const REVIEWED_RESEARCH_QUERY = groq`
  *[_type == "researchPaperSummary" && isReviewed == true] | order(publishedYear desc) {
    _id,
    "slug": slug.current,
    paperTitle,
    authors,
    journal,
    publishedYear,
    doi,
    summary,
    relevanceNote,
    topics
  }
`;

// ─── Policy Updates ───────────────────────────────────────────────────────────
export const REVIEWED_POLICY_UPDATES_QUERY = groq`
  *[_type == "policyUpdate" && isReviewed == true] | order(effectiveDate desc) {
    _id,
    "slug": slug.current,
    title,
    effectiveDate,
    issuingBody,
    summary,
    sourceUrl,
    impactAssessment,
    affectedSectors[]->{ "slug": slug.current, name }
  }
`;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const ALL_FAQ_QUERY = groq`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const FAQ_BY_CATEGORY_QUERY = groq`
  *[_type == "faqItem" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

// ─── Compliance Statements ────────────────────────────────────────────────────
export const ALL_COMPLIANCE_QUERY = groq`
  *[_type == "complianceStatement"] | order(order asc) {
    _id,
    framework,
    issuingBody,
    statement,
    lastReviewedDate,
    order
  }
`;
