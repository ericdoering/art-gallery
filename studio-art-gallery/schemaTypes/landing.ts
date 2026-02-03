import { defineType } from "sanity";

export const landing = defineType({
    name: 'landing',
    title: 'Landing',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 4,
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
        validation: (Rule: any) =>
          Rule.required()
            .min(3)
            .max(3)
            .error('Please upload exactly 3 images.'),
      },
    ],
  });
  