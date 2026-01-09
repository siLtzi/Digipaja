import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for immediate updates after publishing
  // Disable Next.js fetch caching
  fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
})
