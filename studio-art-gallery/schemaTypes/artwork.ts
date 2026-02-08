import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'
import { ArtworkIdInput } from '../components/ArtworkIdInput'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'artworkId',
      title: 'Artwork ID',
      type: 'string',
      description: 'Unique identifier for this artwork',
      readOnly: true,
      components: {
        input: ArtworkIdInput,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g. Oil on canvas, Digital, Photography',
    }),

    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g. 24 × 36 in or 60 × 90 cm',
    }),

    defineField({
      name: 'yearCreated',
      title: 'Year Created',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1000).max(new Date().getFullYear()),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in USD (or your default currency)',
      validation: (Rule) => Rule.min(0),
      hidden: ({document}) => document?.available === false,
    }),

    defineField({
      name: 'available',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show prominently on the site',
      initialValue: false,
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      available: 'available',
    },
    prepare(selection) {
      const {title, media, available} = selection
      return {
        title,
        subtitle: available ? 'Available' : 'Not Available',
        media,
      }
    },
  },
})
