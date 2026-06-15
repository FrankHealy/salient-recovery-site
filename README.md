# Salient Recovery Public Site

A multilingual Next.js public website for the Salient Recovery / Acutis platform.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Sanity CMS as the content source

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your site settings:

```bash
cp .env.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://salientrecovery.ie
NEXT_PUBLIC_DEFAULT_LOCALE=en
SANITY_API_TOKEN=
```

`SANITY_API_TOKEN` is optional for the public site. Leave it unset unless you add draft or private server-side Sanity access.

Published Sanity content is revalidated by the website every 60 seconds. The
`/debug/sanity` route bypasses the Next.js data cache and displays the runtime
project ID, dataset, fetch mode, and published navigation labels.

### 3. Run the development server

```bash
npm run dev
```

The site runs on `http://localhost:3000` and redirects `/` to `/en`.

## Sanity Studio

Sanity Studio has been extracted into a separate project at `C:\SALIENT-STUDIO`.

- Public site repo: `C:\salient-recovery`
- Studio repo: `C:\SALIENT-STUDIO`

Run Studio from the separate repo:

```bash
cd C:\SALIENT-STUDIO
npm run dev
```

## Project Structure

```text
src/
  app/
    [locale]/
  components/
  lib/
    i18n.ts
    types.ts
    sanity/
      client.ts
      queries.ts
  styles/
```

## Routes

- `/`
- `/[locale]`
- `/[locale]/platform`
- `/[locale]/platform/timeline`
- `/[locale]/platform/forms`
- `/[locale]/platform/facility-mapping`
- `/[locale]/platform/audit-compliance`
- `/[locale]/how-it-works`
- `/[locale]/sectors`
- `/[locale]/resources`
- `/[locale]/resources/[slug]`
- `/[locale]/about`
- `/[locale]/contact`

## Docker Deployment

This repo is configured for standalone Next.js Docker deployment.

### Prepare deploy environment

Create a server-side env file from `.env.docker.example`:

```bash
cp .env.docker.example .env
```

Required values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_DEFAULT_LOCALE=en
SANITY_API_TOKEN=
```

The public Sanity variables are required at both build time and runtime because the app prerenders content during `next build`.

### Build and run with Docker Compose

```bash
docker compose --env-file .env up -d --build
```

### Build and run with plain Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET \
  --build-arg NEXT_PUBLIC_SANITY_API_VERSION=$NEXT_PUBLIC_SANITY_API_VERSION \
  --build-arg NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
  --build-arg NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE \
  -t salient-recovery:latest .

docker run -d \
  --name salient-recovery \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  salient-recovery:latest
```

### VPS Notes

- Put Nginx, Caddy, or another reverse proxy in front of port `3000`.
- Terminate TLS at the reverse proxy.
- Rebuild and redeploy the image when Sanity content changes if you rely on prerendered output.
