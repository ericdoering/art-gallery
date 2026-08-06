import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const media = defineType({
	name: 'media',
	title: 'Media',
	type: 'document',
	icon: ImageIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {hotspot: true},
			fields: [
				{
					name: 'alt',
					title: 'Alt Text',
					type: 'string',
				},
			],
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
	},
})
