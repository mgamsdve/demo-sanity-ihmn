import "server-only";

import { cache } from "react";
import { sanityFetch } from "@/lib/sanity.live";
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

type LiveFetchOptions = {
  params?: Record<string, unknown>;
  tags?: string[];
  perspective?: "published" | "drafts";
  stega?: boolean;
};

function isOutsideRequestScopeError(error: unknown): error is Error {
  return error instanceof Error && error.message.includes("outside a request scope");
}

async function fetchWithLive<T>(query: string, options: LiveFetchOptions = {}): Promise<T> {
  try {
    const { data } = await sanityFetch({ query, ...options });
    return data as T;
  } catch (error) {
    if (isOutsideRequestScopeError(error)) {
      const { data } = await sanityFetch({
        query,
        ...options,
        perspective: options.perspective ?? "published",
        stega: options.stega ?? false,
      });
      return data as T;
    }

    throw error;
  }
}

export const getSiteConfig = cache(() =>
  fetchWithLive<SiteConfig | null>(SITE_CONFIG_QUERY, { tags: ["global"] }),
);

export const getNavigation = cache(() =>
  fetchWithLive<NavigationConfig | null>(NAVIGATION_QUERY, { tags: ["global"] }),
);

export const getFooter = cache(() =>
  fetchWithLive<FooterConfig | null>(FOOTER_QUERY, { tags: ["global"] }),
);

export const getPageAccueil = cache(() =>
  fetchWithLive<PageAccueil | null>(PAGE_ACCUEIL_QUERY, { tags: ["pageAccueil"] }),
);

export const getPageAPropos = cache(() =>
  fetchWithLive<PageAPropos | null>(PAGE_A_PROPOS_QUERY, { tags: ["pageAPropos"] }),
);

export const getPageContact = cache(() =>
  fetchWithLive<PageContact | null>(PAGE_CONTACT_QUERY, { tags: ["pageContact"] }),
);

export const getPageFormations = cache(() =>
  fetchWithLive<PageFormations | null>(PAGE_FORMATIONS_QUERY, { tags: ["pageFormations"] }),
);

export const getPageProfesseurs = cache(() =>
  fetchWithLive<PageProfesseurs | null>(PAGE_PROFESSEURS_QUERY, { tags: ["pageProfesseurs"] }),
);

export const getAllFormations = cache(() =>
  fetchWithLive<Formation[]>(ALL_FORMATIONS_QUERY, { tags: ["formations"] }),
);

export const getFormationBySlug = cache((slug: string) =>
  fetchWithLive<Formation | null>(FORMATION_BY_SLUG_QUERY, { params: { slug }, tags: ["formations"] }),
);

export const getAllFormationSlugs = cache(() =>
  fetchWithLive<{ slug: string }[]>(ALL_FORMATION_SLUGS_QUERY, {
    tags: ["formations"],
    perspective: "published",
    stega: false,
  }),
);

export const getAllProfesseurs = cache(() =>
  fetchWithLive<Professeur[]>(ALL_PROFESSEURS_QUERY, { tags: ["professeurs"] }),
);

export const getProfesseurBySlug = cache((slug: string) =>
  fetchWithLive<ProfesseurDetail | null>(PROFESSEUR_BY_SLUG_QUERY, { params: { slug }, tags: ["professeurs"] }),
);

export const getAllProfesseurSlugs = cache(() =>
  fetchWithLive<{ slug: string }[]>(ALL_PROFESSEUR_SLUGS_QUERY, {
    tags: ["professeurs"],
    perspective: "published",
    stega: false,
  }),
);

export const getAllTemoignages = cache(() =>
  fetchWithLive<Temoignage[]>(ALL_TEMOIGNAGES_QUERY, { tags: ["temoignages"] }),
);
