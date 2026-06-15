// sanity/client.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const isDevelopment = process.env.NODE_ENV === 'development';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: !isDevelopment,
  perspective: 'published' as const,
};

export const client = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN, // only for drafts / mutations
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
