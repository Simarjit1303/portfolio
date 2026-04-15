import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack filesystem cache for dev.
  // The .next/dev directory is on a slow HDD (F: drive) — the 766–972ms FS
  // benchmark and 738MB cache are causing 10–19s write stalls and a 2.3-min GET.
  // With caching off, every compile starts cold but never blocks on disk I/O.
  // Re-enable once the project is moved to an SSD or a RAM-disk symlink is set up.
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
