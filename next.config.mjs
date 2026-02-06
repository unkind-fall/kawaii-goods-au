import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Enables `getCloudflareContext()` during `next dev`.
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "makeshop-multi-images.akamaized.net" },
      { protocol: "https", hostname: "gigaplus.makeshop.jp" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
