import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Enables `getCloudflareContext()` during `next dev`.
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
