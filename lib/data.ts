import "server-only";

import { cache } from "react";
import { client } from "@/lib/sanity";
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

export const getSiteConfig = cache(() =>
  client.fetch<SiteConfig | null>(SITE_CONFIG_QUERY, {}, { next: { tags: ["global"] } }),
);

export const getNavigation = cache(() =>
  client.fetch<NavigationConfig | null>(NAVIGATION_QUERY, {}, { next: { tags: ["global"] } }),
);

export const getFooter = cache(() =>
  client.fetch<FooterConfig | null>(FOOTER_QUERY, {}, { next: { tags: ["global"] } }),
);

export const getPageAccueil = cache(() =>
  client.fetch<PageAccueil | null>(PAGE_ACCUEIL_QUERY, {}, { next: { tags: ["pageAccueil"] } }),
);

export const getPageAPropos = cache(() =>
  client.fetch<PageAPropos | null>(PAGE_A_PROPOS_QUERY, {}, { next: { tags: ["pageAPropos"] } }),
);

export const getPageContact = cache(() =>
  client.fetch<PageContact | null>(PAGE_CONTACT_QUERY, {}, { next: { tags: ["pageContact"] } }),
);

export const getPageFormations = cache(() =>
  client.fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY, {}, { next: { tags: ["pageFormations"] } }),
);

export const getPageProfesseurs = cache(() =>
  client.fetch<PageProfesseurs | null>(PAGE_PROFESSEURS_QUERY, {}, { next: { tags: ["pageProfesseurs"] } }),
);

export const getAllFormations = cache(() =>
  client.fetch<Formation[]>(ALL_FORMATIONS_QUERY, {}, { next: { tags: ["formations"] } }),
);

export const getFormationBySlug = cache((slug: string) =>
  client.fetch<Formation | null>(FORMATION_BY_SLUG_QUERY, { slug }, { next: { tags: ["formations"] } }),
);

export const getAllFormationSlugs = cache(() =>
  client
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
    ),
);

export const getAllProfesseurs = cache(() =>
  client.fetch<Professeur[]>(ALL_PROFESSEURS_QUERY, {}, { next: { tags: ["professeurs"] } }),
);

export const getProfesseurBySlug = cache((slug: string) =>
  client.fetch<ProfesseurDetail | null>(PROFESSEUR_BY_SLUG_QUERY, { slug }, { next: { tags: ["professeurs"] } }),
);

export const getAllProfesseurSlugs = cache(() =>
  client
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
    ),
);

export const getAllTemoignages = cache(() =>
  client.fetch<Temoignage[]>(ALL_TEMOIGNAGES_QUERY, {}, { next: { tags: ["temoignages"] } }),
);
