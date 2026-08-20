import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role / Project Type",
      type: "string",
      description: "e.g. RESIDENTIAL PROJECT, LUXE VILLA PROJECT",
    }),
    defineField({
      name: "avatar",
      title: "Avatar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "projectImage",
      title: "Project Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: true,
      description: "Only approved testimonials are displayed on the website",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", approved: "approved" },
    prepare({ title, subtitle, approved }) {
      return {
        title,
        subtitle: approved === false ? `${subtitle} (hidden)` : subtitle,
      };
    },
  },
});

export const testimonialStats = defineType({
  name: "testimonialStats",
  title: "Testimonials Stats",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Testimonials Stats" };
    },
  },
});
