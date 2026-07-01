import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'jmcfe2yn',
  dataset: 'production',
  apiVersion: '2025-01-24',
  useCdn: true,
})