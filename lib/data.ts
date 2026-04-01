import "server-only";

import { draftMode } from "next/headers";
import { cache } from "react";
import { client } from "@/lib/sanity";
import { previewClient } from "@/lib/sanity.preview";
import {
  ALL_FORMATIONS_QUERY,
  ALL_FORMATION_SLUGS_QUERY,
  ALL_PROFESSEURS_QUERY,
  ALL_PROFESSEUR_SLUGS_QUERY,
  ALL_TEMOIGNAGES_QUERY,
  FOOTER_QUERY,
  FORMATION_BY_SLUG_QUERY,
  NAVIGATION_QUERY,
  PAGE_ACCUEIL_QUERY,
  PAGE_A_PROPOS_QUERY,
  PAGE_CONTACT_QUERY,
  PAGE_FORMATIONS_QUERY,
  PAGE_PROFESSEURS_QUERY,
  PROFESSEUR_BY_SLUG_QUERY,
  SITE_CONFIG_QUERY,
} from "@/lib/queries";
import type {
  FooterConfig,
  Formation,
  NavigationConfig,
  PageAccueil,
  PageAPropos,
  PageContact,
  PageFormations,
  PageProfesseurs,
  Professeur,
  ProfesseurDetail,
  SiteConfig,
  Temoignage,
} from "@/types";

async function getDraftModeState() {
  try {
    return await draftMode();
  } catch (error) {
    if (error instanceof Error && error.message.includes("outside a request scope")) {
      return { isEnabled: false };
    }

    throw error;
  }
}

export const getSiteConfig = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<SiteConfig | null>(SITE_CONFIG_QUERY, {});
  }

  return client.fetch<SiteConfig | null>(SITE_CONFIG_QUERY, {}, { next: { tags: ["global"] } });
});

export const getNavigation = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<NavigationConfig | null>(NAVIGATION_QUERY, {});
  }

  return client.fetch<NavigationConfig | null>(NAVIGATION_QUERY, {}, { next: { tags: ["global"] } });
});

export const getFooter = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<FooterConfig | null>(FOOTER_QUERY, {});
  }

  return client.fetch<FooterConfig | null>(FOOTER_QUERY, {}, { next: { tags: ["global"] } });
});

export const getPageAccueil = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<PageAccueil | null>(PAGE_ACCUEIL_QUERY, {});
  }

  return client.fetch<PageAccueil | null>(PAGE_ACCUEIL_QUERY, {}, { next: { tags: ["pageAccueil"] } });
});

export const getPageAPropos = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<PageAPropos | null>(PAGE_A_PROPOS_QUERY, {});
  }

  return client.fetch<PageAPropos | null>(PAGE_A_PROPOS_QUERY, {}, { next: { tags: ["pageAPropos"] } });
});

export const getPageContact = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<PageContact | null>(PAGE_CONTACT_QUERY, {});
  }

  return client.fetch<PageContact | null>(PAGE_CONTACT_QUERY, {}, { next: { tags: ["pageContact"] } });
});

export const getPageFormations = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY, {});
  }

  return client.fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY, {}, { next: { tags: ["pageFormations"] } });
});

export const getPageProfesseurs = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<PageProfesseurs | null>(PAGE_PROFESSEURS_QUERY, {});
  }

  return client.fetch<PageProfesseurs | null>(PAGE_PROFESSEURS_QUERY, {}, { next: { tags: ["pageProfesseurs"] } });
});

export const getAllFormations = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<Formation[]>(ALL_FORMATIONS_QUERY, {});
  }

  return client.fetch<Formation[]>(ALL_FORMATIONS_QUERY, {}, { next: { tags: ["formations"] } });
});

export const getFormationBySlug = cache(async (slug: string) => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<Formation | null>(FORMATION_BY_SLUG_QUERY, { slug });
  }

  return client.fetch<Formation | null>(FORMATION_BY_SLUG_QUERY, { slug }, { next: { tags: ["formations"] } });
});

export const getAllFormationSlugs = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<{ slug: string }[]>(ALL_FORMATION_SLUGS_QUERY, {});
  }

  return client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(
      ALL_FORMATION_SLUGS_QUERY,
      {},
      {
        perspective: "published",
        filterResponse: true,
        stega: false,
        next: { tags: ["formations"] },
      },
    );
});

export const getAllProfesseurs = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<Professeur[]>(ALL_PROFESSEURS_QUERY, {});
  }

  return client.fetch<Professeur[]>(ALL_PROFESSEURS_QUERY, {}, { next: { tags: ["professeurs"] } });
});

export const getProfesseurBySlug = cache(async (slug: string) => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<ProfesseurDetail | null>(PROFESSEUR_BY_SLUG_QUERY, { slug });
  }

  return client.fetch<ProfesseurDetail | null>(PROFESSEUR_BY_SLUG_QUERY, { slug }, { next: { tags: ["professeurs"] } });
});

export const getAllProfesseurSlugs = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<{ slug: string }[]>(ALL_PROFESSEUR_SLUGS_QUERY, {});
  }

  return client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(
      ALL_PROFESSEUR_SLUGS_QUERY,
      {},
      {
        perspective: "published",
        filterResponse: true,
        stega: false,
        next: { tags: ["professeurs"] },
      },
    );
});

export const getAllTemoignages = cache(async () => {
  const { isEnabled } = await getDraftModeState();

  if (isEnabled) {
    return previewClient.fetch<Temoignage[]>(ALL_TEMOIGNAGES_QUERY, {});
  }

  return client.fetch<Temoignage[]>(ALL_TEMOIGNAGES_QUERY, {}, { next: { tags: ["temoignages"] } });
});
