import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Enables `getCloudflareContext()` during `next dev`.
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
