import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: ['@repo/shared-config', '@repo/shared-db'],
};

export default nextConfig;
