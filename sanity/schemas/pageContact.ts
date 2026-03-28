import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageContact",
  title: "Page Contact",
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
    defineField({ name: "detailsTitle", title: "Titre coordonnées", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "formTitle", title: "Titre formulaire", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "nameLabel", title: "Label nom", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "emailLabel", title: "Label email", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subjectLabel", title: "Label sujet", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "messageLabel", title: "Label message", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "submitLabel", title: "Label bouton envoi", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "contactInfo",
      title: "Informations de contact",
      type: "object",
      fields: [
        defineField({ name: "address", title: "Adresse", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email().required() }),
        defineField({ name: "phone", title: "Téléphone", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
