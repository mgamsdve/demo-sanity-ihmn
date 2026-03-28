import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "formation",
  title: "Formation",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: ["Secondaire", "Spécialisation"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Durée",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "objectives",
      title: "Objectifs pédagogiques",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "teacher",
      title: "Professeur",
      type: "reference",
      to: [{ type: "professeur" }],
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
