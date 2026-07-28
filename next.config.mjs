/** @type {import('next').NextConfig} */
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const owner = process.env.GITHUB_REPOSITORY?.split('/')[0] ?? '';
const isUserSite = repository === `${owner}.github.io`;
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === 'true';
const basePath = process.env.GITHUB_ACTIONS === 'true' && !isUserSite && !isCustomDomain ? `/${repository}` : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
};
export default nextConfig;
