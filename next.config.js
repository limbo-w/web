/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "source.unsplash.com",
      "goflashdeals.com",
      "goflash.3rcd.com",
    ],
  },
  images: {
    domains: [
      "source.unsplash.com",
      "goflashdeals.com",
      "goflash.3rcd.com",
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/api/auth/google',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig
