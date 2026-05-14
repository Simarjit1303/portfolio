import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SVG thumbnails don't need Next.js optimization pipeline
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Reduce default quality slightly for faster LCP
    qualities: [75, 85],
  },
  // Compress all static assets
  compress: true,
};

export default nextConfig;
