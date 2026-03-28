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
  name: "navigation",
  title: "Navigation",
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
      name: "links",
      title: "Liens",
      type: "array",
      of: [
        defineArrayMember({
          name: "link",
          title: "Lien",
          type: "object",
          fields: linkFields,
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: linkFields,
      validation: (rule) => rule.required(),
    }),
  ],
});
