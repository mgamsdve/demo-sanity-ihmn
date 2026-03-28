import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageProfesseurs",
  title: "Page Professeurs",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      description: "Facultatif pour la démo : laissez vide pour utiliser les métadonnées globales.",
      fields: [
        defineField({
          name: "title",
          title: "Titre SEO",
          type: "string",
          description: "Optionnel en démo. Si vide, le titre par défaut du site sera utilisé.",
        }),
        defineField({
          name: "description",
          title: "Description SEO",
          type: "text",
          rows: 3,
          description: "Optionnelle en démo. Si vide, la description par défaut du site sera utilisée.",
        }),
      ],
    }),
    defineField({ name: "headerTitle", title: "Titre hero", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "headerSubtitle",
      title: "Sous-titre hero",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Détail professeur",
      type: "object",
      fields: [
        defineField({ name: "notFoundTitle", title: "Titre introuvable", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "notFoundDescription",
          title: "Description introuvable",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "taughtFormationsTitle",
          title: "Titre formations enseignées",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "teacherPrefix",
          title: "Préfixe enseignant",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "learnMoreLabel",
          title: "Label En savoir plus",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "profileLabel",
          title: "Label voir profil",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
