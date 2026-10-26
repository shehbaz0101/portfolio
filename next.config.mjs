/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: { useTypeScriptCli: false },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
