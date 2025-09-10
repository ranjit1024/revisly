import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol:'https',
        hostname: 'img.icons8.com',
      },
    ],
    domains:['lh3.googleusercontent.com']
  }
};

export default nextConfig;
