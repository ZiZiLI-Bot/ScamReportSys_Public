/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3451",
        pathname: "/api/static/streams/**",
      },
      {
        protocol: "https",
        hostname: "api.srp.chuhung.com",
        port: "",
        pathname: "/api/static/streams/**",
      },
    ],
  },
};

export default nextConfig;
