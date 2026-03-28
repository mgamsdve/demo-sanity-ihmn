import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "pageFormations",
  title: "Page Formations",
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
      name: "teacherPrefix",
      title: "Préfixe enseignant",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fallbackTeacherName",
      title: "Fallback enseignant",
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
      name: "detail",
      title: "Détail formation",
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
          name: "breadcrumbHomeLabel",
          title: "Fil d'ariane accueil",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "breadcrumbListLabel",
          title: "Fil d'ariane liste",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "durationPrefix",
          title: "Préfixe durée",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "descriptionTitle",
          title: "Titre description",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "objectivesTitle",
          title: "Titre objectifs",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "objectives",
          title: "Objectifs",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "teacherSectionTitle",
          title: "Titre section enseignant",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "teacherProfileLabel",
          title: "Label voir profil",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "enrollLabel",
          title: "Label inscription",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
