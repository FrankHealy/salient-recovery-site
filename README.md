# Salient Recovery — Public Site

A professional, multilingual public website for Salient Recovery / Acutis clinical operations platform.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Sanity CMS** (content management)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Sanity project credentials:

```bash
cp .env.example .env.local
```

Required variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
NEXT_PUBLIC_SITE_URL=https://salientrecovery.ie
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### 3. Set up Sanity project

1. Create a project at [sanity.io](https://sanity.io)
2. Add the project ID and dataset to your `.env.local`
3. Run the Sanity Studio:

```bash
npx sanity dev
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en` by default.

## Project Structure

```
src/
  app/
    [locale]/         # All locale-aware pages
      page.tsx        # Home
      platform/       # Platform section + sub-pages
      how-it-works/
      sectors/
      resources/
      about/
      contact/
    layout.tsx        # Root layout (redirects to /en)
  components/
    layout/           # Header, Footer
    content/          # LocaleSwitch, PortableText
    ui/               # PageHero, SectionHeader, FeatureBlock, etc.
  lib/
    i18n.ts           # Translation helpers
    types.ts          # TypeScript interfaces
  styles/
    globals.css       # Global styles + CSS variables

sanity/
  schemas/            # All content schemas
  client.ts           # Sanity client
  queries.ts          # GROQ queries
  sanity.config.ts    # Studio configuration
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/en` |
| `/[locale]` | Home page |
| `/[locale]/platform` | Platform overview |
| `/[locale]/platform/timeline` | Resident timeline |
| `/[locale]/platform/forms` | Form management |
| `/[locale]/platform/facility-mapping` | Facility hierarchy |
| `/[locale]/platform/audit-compliance` | Audit & compliance |
| `/[locale]/how-it-works` | Workflow diagrams |
| `/[locale]/sectors` | Sector-specific pages |
| `/[locale]/resources` | Articles, signals, digest |
| `/[locale]/resources/[slug]` | Resource detail |
| `/[locale]/about` | About Salient Recovery |
| `/[locale]/contact` | Contact information |

## Localisation

Supported locales: `en` (English), `ie` (Irish)

All content is served from Sanity with locale-aware fields (`localeString`, `localeText`, `localeBlock`). The `t()` helper in `src/lib/i18n.ts` handles locale selection with English fallback.

## Content Model

The system uses a draft → review → publish flow for external content:

- `externalSignal` — requires `isReviewed: true` before appearing on site
- `researchPaperSummary` — same `isReviewed` gate
- `policyUpdate` — same `isReviewed` gate

All content ingested as draft. Manual reviewer control. No auto-publish.

## Design System

Defined in `tailwind.config.ts`:

- **Primary**: Deep institutional blue (`#1e3c66`)
- **Surface**: Off-white (`#F7F5F2`) 
- **Ink**: Dark charcoal text (`#1C1C1C`)
- **Fonts**: Libre Baskerville (headings), IBM Plex Sans (body), IBM Plex Mono (labels)

No gradients. No marketing language. No stock imagery.
