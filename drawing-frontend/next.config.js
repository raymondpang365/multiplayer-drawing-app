const path = require('path')
const withVideos = require('next-videos')
const { patchWebpackConfig } = require('next-global-css')



const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const configs = {
  // Target must be serverless
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    return patchWebpackConfig(config, options)
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    loader: 'imgix',
    path: ''
  },
  pageExtensions: ['page.tsx'],

  reactStrictMode: false, // Improved error handling if enabled
  swcMinify: true,      // Enable SWC minification for improved performance
  compiler: {
    removeConsole: false // process.env.NODE_ENV !== "development", // Remove console.log in production
  }
};

const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

if( process.env.NEXT_PUBLIC_SERVERLESS === 'TRUE') configs['target'] = "serverless"

module.exports =  withPWA(withBundleAnalyzer(withVideos(configs)))
