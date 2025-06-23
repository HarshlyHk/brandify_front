/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-047aa9653e2346718393f69be234faf1.r2.dev",
        pathname: "/**",
      },
    ],
  },
  
};

export default nextConfig;
