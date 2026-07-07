const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config, { dev }) => {
    // The on-disk webpack cache repeatedly corrupts in dev on this machine
    // ("Cannot find module './vendor-chunks/X.js'"), forcing a full .next wipe
    // to recover. In-memory cache avoids the corruption entirely; only dev
    // cold-starts get marginally slower, production builds are unaffected.
    if (dev) {
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
