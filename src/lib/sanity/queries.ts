// sanity/queries.ts
import { groq } from 'next-sanity';

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

// ─── Platform Features ────────────────────────────────────────────────────────
export const ALL_PLATFORM_FEATURES_QUERY = groq`
  *[_type == "platformFeature"] | order(order asc) {
    _id,
    featureId,
    title,
    shortDescription,
    associatedEntity,
    capabilities[]{ label },
    regulatoryRelevance,
    order
  }
`;

export const PLATFORM_FEATURES_BY_ENTITY_QUERY = groq`
  *[_type == "platformFeature" && associatedEntity == $entity] | order(order asc) {
    _id,
    featureId,
    title,
    shortDescription,
    associatedEntity,
    capabilities[]{ label },
    regulatoryRelevance
  }
`;

// ─── Workflow Steps ────────────────────────────────────────────────────────────
export const WORKFLOW_STEPS_QUERY = groq`
  *[_type == "workflowStep" && workflowType == $workflowType] | order(stepNumber asc) {
    _id,
    stepNumber,
    workflowType,
    title,
    description,
    actor,
    systemAction
  }
`;

export const ALL_WORKFLOW_STEPS_QUERY = groq`
  *[_type == "workflowStep"] | order(workflowType asc, stepNumber asc) {
    _id,
    stepNumber,
    workflowType,
    title,
    description,
    actor,
    systemAction
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
    applicableFeatures[]->{ _id, featureId, title, shortDescription, associatedEntity },
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
    applicableFeatures[]->{ _id, featureId, title, shortDescription, associatedEntity, capabilities[]{ label } }
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
