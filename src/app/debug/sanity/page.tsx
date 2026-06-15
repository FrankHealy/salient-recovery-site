import { client, sanityConfig } from '@/lib/sanity/client';
import { NAV_ITEMS_QUERY } from '@/lib/sanity/queries';
import type { NavItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function SanityDebugPage() {
  const navItems = await client.fetch<NavItem[]>(
    NAV_ITEMS_QUERY,
    {},
    { cache: 'no-store' }
  );

  return (
    <main style={{ fontFamily: 'monospace', margin: '2rem auto', maxWidth: 960, padding: '0 1rem' }}>
      <h1>Sanity runtime debug</h1>
      <dl>
        <dt>Project ID</dt>
        <dd>{sanityConfig.projectId}</dd>
        <dt>Dataset</dt>
        <dd>{sanityConfig.dataset}</dd>
        <dt>API version</dt>
        <dd>{sanityConfig.apiVersion}</dd>
        <dt>Sanity CDN enabled</dt>
        <dd>{String(sanityConfig.useCdn)}</dd>
        <dt>Fetched at</dt>
        <dd>{new Date().toISOString()}</dd>
      </dl>

      <h2>Published navigation items</h2>
      <pre>{JSON.stringify(navItems.map(({ _id, label, href, order }) => ({
        _id,
        label,
        href,
        order,
      })), null, 2)}</pre>
    </main>
  );
}
