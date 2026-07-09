import { BookIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const about = defineType({
    name: 'about',
    title: 'About',
    type: 'document',
    icon: BookIcon,
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
        type: 'array',
        of: [{type: 'block'}],
      },
      {
        name: 'additionalText',
        title: 'Additional Text',
        type: 'array',
        of: [{type: 'block'}],
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
      },
    ],
  });
  