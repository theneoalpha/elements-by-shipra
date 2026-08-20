import { defineField, defineType } from "sanity";

export const pageMetadata = defineType({
  name: "pageMetadata",
  title: "Page Metadata",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Services", value: "services" },
          { title: "Projects", value: "projects" },
          { title: "Contact", value: "contact" },
          { title: "Reviews", value: "testimonials" },
          { title: "Blog", value: "blog" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Meta Title",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug" },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `/${selection.subtitle === "home" ? "" : selection.subtitle}`,
      };
    },
  },
});
