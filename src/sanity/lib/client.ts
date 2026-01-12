import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for immediate updates after publishing
  stega: {
    enabled: false, // Stega is handled by sanityFetch in live.ts
    studioUrl: '/studio',
  },
})
