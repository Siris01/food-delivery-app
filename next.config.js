/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: []
	}
};

const staticDeployment = {
	output: 'export',
	distDir: 'out',
	images: {
		unoptimized: true
	}
};

module.exports = process.env.STATIC_DEPLOY ? { ...staticDeployment, ...nextConfig } : nextConfig;
