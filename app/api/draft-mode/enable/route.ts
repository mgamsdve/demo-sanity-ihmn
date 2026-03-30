import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { previewClient } from "@/lib/sanity.preview";

const token = process.env.SANITY_API_READ_TOKEN;

const enableDraftMode = token
  ? defineEnableDraftMode({
      client: previewClient.withConfig({ token }),
    })
  : null;

export const GET = enableDraftMode
  ? enableDraftMode.GET
  : async () => new Response("Missing SANITY_API_READ_TOKEN", { status: 500 });
