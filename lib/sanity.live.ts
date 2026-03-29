import "server-only";

import { defineLive } from "next-sanity";
import { previewClient } from "@/lib/sanity.preview";

const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: previewClient,
  serverToken: token,
  browserToken: token,
});
