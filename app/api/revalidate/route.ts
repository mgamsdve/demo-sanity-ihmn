import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type SanityWebhookPayload = {
  _type?: string;
};

const tagsByType: Record<string, string[]> = {
  pageAccueil: ["pageAccueil"],
  formation: ["formations"],
  professeur: ["professeurs", "formations"],
  temoignage: ["temoignages"],
  pageFormations: ["pageFormations"],
  pageProfesseurs: ["pageProfesseurs"],
  pageAPropos: ["pageAPropos"],
  pageContact: ["pageContact"],
  navigation: ["global"],
  footer: ["global"],
  siteConfig: ["global"],
};

export async function POST(request: Request) {
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;
  const secret = new URL(request.url).searchParams.get("secret");

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json()) as SanityWebhookPayload;
  const type = body?._type;
  const tags = (type && tagsByType[type]) ?? ["global"];

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, tags });
}
