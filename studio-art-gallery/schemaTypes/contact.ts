// schemas/contact.js

import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'profileImage',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          { name: 'email' }
        ),
    }),

    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, State, Country',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        defineField({
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Website', value: 'website' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'icon',
              title: 'Icon (SVG preferred)',
              type: 'image',
              description:
                'Upload an SVG or image icon (e.g. LinkedIn logo)',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
              media: 'icon',
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
      subtitle: 'email',
    },
  },
})
