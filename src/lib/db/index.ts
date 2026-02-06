import { getCloudflareContext } from "@opennextjs/cloudflare";

import { createDb } from "./client";

export function getDb() {
  const { env } = getCloudflareContext();
  return createDb(env.DB);
}
