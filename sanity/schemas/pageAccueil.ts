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

const ctaFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "href",
    title: "Lien",
    type: "string",
    validation: (rule) => rule.required(),
  }),
];

export default defineType({
  name: "pageAccueil",
  title: "Page Accueil",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre du document",
      type: "string",
      readOnly: true,
      initialValue: "Page Accueil",
    }),
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
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "subheadline",
          title: "Sous-titre",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaPrimary",
          title: "CTA principal",
          type: "object",
          fields: ctaFields,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaSecondary",
          title: "CTA secondaire",
          type: "object",
          fields: ctaFields,
          validation: (rule) => rule.required(),
        }),
        ...imageFields,
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Statistiques",
      type: "array",
      of: [
        defineArrayMember({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "introCards",
      title: "Cartes intro",
      type: "array",
      of: [
        defineArrayMember({
          name: "introCard",
          title: "Carte intro",
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
    defineField({
      name: "aboutSection",
      title: "Section À propos",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "highlightWord",
          title: "Mot en surbrillance",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "body", title: "Texte", type: "text", rows: 5, validation: (rule) => rule.required() }),
        ...imageFields,
        defineField({ name: "ctaLabel", title: "Label CTA", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "ctaHref", title: "Lien CTA", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "badge", title: "Badge", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "titlePrefix",
          title: "Titre (préfixe)",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "titleHighlight",
          title: "Titre (accent)",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "titleSuffix",
          title: "Titre (suffixe)",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "imageAlt", title: "Alt image", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "facilitiesSection",
      title: "Section installations",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "facilities",
          title: "Installations",
          type: "array",
          of: [
            defineArrayMember({
              name: "facility",
              title: "Installation",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
                ...imageFields,
                defineField({
                  name: "alt",
                  title: "Texte alternatif",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().length(6),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyChooseUsSection",
      title: "Section pourquoi nous choisir",
      type: "object",
      fields: [
        defineField({
          name: "titleLine1",
          title: "Titre ligne 1",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "titleLine2",
          title: "Titre ligne 2",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, validation: (rule) => rule.required() }),
        ...imageFields,
        defineField({ name: "imageAlt", title: "Alt image", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "reasons",
          title: "Raisons",
          type: "array",
          of: [
            defineArrayMember({
              name: "reason",
              title: "Raison",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().length(6),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "programmesSection",
      title: "Section programmes",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "ctaLabel",
          title: "CTA label",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaHref",
          title: "CTA lien",
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
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallerySection",
      title: "Section galerie",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [
            defineArrayMember({
              name: "galleryImage",
              title: "Image galerie",
              type: "object",
              fields: [
                ...imageFields,
                defineField({
                  name: "alt",
                  title: "Texte alternatif",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().length(6),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "testimonialsSection",
      title: "Section témoignages",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "newsletterSection",
      title: "Section newsletter",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "inputPlaceholder",
          title: "Placeholder",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "buttonLabel",
          title: "Label bouton",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        ...imageFields,
        defineField({ name: "imageAlt", title: "Alt image", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
