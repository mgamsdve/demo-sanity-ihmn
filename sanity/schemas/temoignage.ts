import { ComposeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "temoignage",
  title: "Témoignage",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
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
  ],
});
