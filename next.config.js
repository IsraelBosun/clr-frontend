// // /** @type {import('next').NextConfig} */
// // const nextConfig = {}

// // module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     // This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// };

// module.exports = nextConfig;





/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        // This proxies requests made to /api/kenya to the backend API
        source: '/api/kenya',
        destination: 'https://clr-1.onrender.com/kenya',
      },
    ];
  },
};

module.exports = nextConfig;
