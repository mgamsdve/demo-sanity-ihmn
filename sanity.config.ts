import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  "ojttnmx1";
const dataset =
  process.env.SANITY_STUDIO_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  "production";
const previewOrigin =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    : "https://demo-sanity-ihmn.vercel.app";
const schemaTypesWithPageAccueilPreview = schemaTypes.map((schemaType) =>
  schemaType.name === "pageAccueil"
    ? {
        ...schemaType,
        preview: {
          select: { title: "title" },
          prepare: () => ({ title: "Page Accueil" }),
        },
      }
    : schemaType,
);

export default defineConfig({
  name: "default",
  title: "Académie Lumière Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            S.listItem()
              .title("Configuration globale")
              .child(S.document().schemaType("siteConfig").documentId("siteConfig")),
            S.listItem()
              .title("Navigation")
              .child(S.document().schemaType("navigation").documentId("navigation")),
            S.listItem()
              .title("Footer")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.listItem()
              .title("Page Accueil")
              .child(S.document().schemaType("pageAccueil").documentId("pageAccueil")),
            S.listItem()
              .title("Page À propos")
              .child(S.document().schemaType("pageAPropos").documentId("pageAPropos")),
            S.listItem()
              .title("Page Formations")
              .child(S.document().schemaType("pageFormations").documentId("pageFormations")),
            S.listItem()
              .title("Page Professeurs")
              .child(S.document().schemaType("pageProfesseurs").documentId("pageProfesseurs")),
            S.listItem()
              .title("Page Contact")
              .child(S.document().schemaType("pageContact").documentId("pageContact")),
            S.divider(),
            S.documentTypeListItem("formation").title("Formations"),
            S.documentTypeListItem("professeur").title("Professeurs"),
            S.documentTypeListItem("temoignage").title("Témoignages"),
          ]),
    }),
    presentationTool({
      // Hosted Studio URL: https://academie-lumiere.sanity.studio
      // Manual CORS setup in sanity.io/manage -> Project -> API -> CORS Origins:
      // - https://demo-sanity-ihmn.vercel.app (credentials: true)
      // - http://localhost:3000 (credentials: true)
      // - http://localhost:3333 (credentials: true, for local Studio origin)
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypesWithPageAccueilPreview,
  },
});
