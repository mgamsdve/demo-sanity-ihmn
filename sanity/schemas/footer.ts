import { LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const linkFields = [
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
  name: "footer",
  title: "Footer",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Nom de marque",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Liens sociaux",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialLink",
          title: "Lien social",
          type: "object",
          fields: linkFields,
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "columns",
      title: "Colonnes",
      type: "array",
      of: [
        defineArrayMember({
          name: "column",
          title: "Colonne",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titre",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "links",
              title: "Liens",
              type: "array",
              of: [
                defineArrayMember({
                  name: "columnLink",
                  title: "Lien",
                  type: "object",
                  fields: linkFields,
                }),
              ],
              validation: (rule) => rule.required().min(1),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "copyrightText",
      title: "Texte copyright",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
