import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Note: PWA is disabled in development mode by default.
  // To test in development, you can set disable: false
  // disable: process.env.NODE_ENV === 'development',
})(nextConfig);