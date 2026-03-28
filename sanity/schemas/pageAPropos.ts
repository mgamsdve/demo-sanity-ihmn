import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const imageFields = [
  defineField({
    name: "image",
    title: "Image",
    type: "image",
    options: { hotspot: true },
  }),
  defineField({
    name: "externalImageUrl",
    title: "Image externe (URL)",
    type: "url",
  }),
];

export default defineType({
  name: "pageAPropos",
  title: "Page À propos",
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
      name: "missionSection",
      title: "Section mission",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "body",
          title: "Texte principal",
          type: "text",
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "extraBody",
          title: "Texte complémentaire",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        ...imageFields,
        defineField({ name: "ctaLabel", title: "CTA label", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "ctaHref", title: "CTA lien", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "imageAlt", title: "Alt image", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "valuesSection",
      title: "Section valeurs",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "values",
          title: "Valeurs",
          type: "array",
          of: [
            defineArrayMember({
              name: "value",
              title: "Valeur",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
                defineField({
                  name: "body",
                  title: "Description",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().length(3),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "teamSection",
      title: "Section équipe",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "ctaLabel", title: "CTA label", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "ctaHref", title: "CTA lien", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
