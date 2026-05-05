// sanity/schemas/index.ts
import { siteSettings } from './siteSettings';
import { navigationItem } from './navigationItem';
import { localeSettings } from './localeSettings';
import { page } from './page';
import { platformFeature } from './platformFeature';
import { workflowStep } from './workflowStep';
import {
  sectorPage,
  resourceArticle,
  externalSignal,
  weeklyDigest,
  researchPaperSummary,
  policyUpdate,
  faqItem,
  complianceStatement,
} from './contentSchemas';

export const schemaTypes = [
  // Settings (singletons)
  siteSettings,
  localeSettings,

  // Navigation
  navigationItem,

  // Pages
  page,

  // Platform
  platformFeature,
  workflowStep,

  // Sector
  sectorPage,

  // Resources
  resourceArticle,
  externalSignal,
  weeklyDigest,
  researchPaperSummary,
  policyUpdate,

  // Support
  faqItem,
  complianceStatement,
];
