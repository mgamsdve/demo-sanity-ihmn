import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteConfig",
  title: "Configuration globale",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "schoolName",
      title: "Nom de l'école",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDefaultTitle",
      title: "SEO title par défaut",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitleTemplate",
      title: "Template SEO title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDefaultDescription",
      title: "SEO description par défaut",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});
