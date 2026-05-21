import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'art-gallery',

  projectId: 'jmcfe2yn',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('artwork').title('Artworks'),
            S.divider(),
            S.documentTypeListItem('landing').title('Landing'),
            S.divider(),
            S.documentTypeListItem('about').title('About'),
            S.divider(),
            S.documentTypeListItem('contact').title('Contact'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
