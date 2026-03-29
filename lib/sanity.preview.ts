import "server-only";

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2026-02-01";
const studioUrl = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/studio` : "/studio";
const token = process.env.SANITY_API_READ_TOKEN;

export const previewClient = createClient({
  projectId: projectId ?? "missing-project-id",
  dataset,
  apiVersion,
  useCdn: false,
  token,
  stega: {
    enabled: true,
    studioUrl,
  },
});
