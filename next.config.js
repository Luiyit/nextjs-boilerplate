/** @type {import('next').NextConfig} */

// TODO: Enable import { resourcesPathMap } from @app/config/paths/resources.d
const paths = [
  // PAGES
  '/me/stores',
  '/me/stores/:id',
  '/me/redemptions',

  '/admin/dash',
  '/admin/customers',
  '/admin/redemption_history',
  '/admin/products',
  '/admin/credits',


  // API
  '/api/users/me/stores',
  '/api/users/me/redemptions',
  //api/users/me/credits

  '/api/stores/me/customers',
  '/api/stores/me/customers/:id',
  '/api/stores/me/redemptions',
  '/api/stores/me/redemptions/:id',
  '/api/stores/me/products',
  '/api/stores/me/products/:id',
  '/api/stores/me/credits',
  '/api/stores/me/settings',
  '/api/stores/me/settings/:id',

  '/api/stores',
  '/api/stores/:id',
  '/api/stores/:id/products', 
  
];

const resourcesPathMap = [
  {source: '/redemption_history', destination: '/orders'},
  {source: '/redemptions', destination: '/orders'},
  {source: '/stores', destination: '/organizations'},
  {source: '/my_store', destination: '/my_organization'},
  {source: '/customers', destination: '/clients'},
]

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
      cssProp: true,
      namespace: "boilerplate",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.kempinski.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '*.timeout.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
  // https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites
  async rewrites() {
    const list = paths.map((source) => {
      let destination = source;
      for (const pathMap of resourcesPathMap) {
        destination = destination.replace(pathMap.source, pathMap.destination)
      }
  
      return { source, destination }
    })
    return list;
  },
}

module.exports = nextConfig


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: "loyaltyme",
    project: "javascript-nextjs",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
