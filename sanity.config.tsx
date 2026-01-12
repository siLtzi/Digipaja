'use client'

/**
 * This configuration is used for the Sanity Studio that's mounted on the
 * \`src/app/studio/[[...tool]]/page.tsx\` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { buildLegacyTheme } from 'sanity'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

// Digipaja brand colors
const digipajaOrange = '#ff8a3c'
const digipajaOrangeDark = '#ff6b00'
const digipajaOrangeLight = '#ffb347'

// Custom Sanity theme with Digipaja branding
const digipajaTheme = buildLegacyTheme({
  // Base colors
  '--black': '#0a0a0f',
  '--white': '#f4f4f5',
  
  // Grays
  '--gray': '#71717a',
  '--gray-base': '#27272a',
  
  // Brand/accent - using Digipaja orange
  '--brand-primary': digipajaOrange,
  
  // Component colors
  '--component-bg': '#0f0f14',
  '--component-text-color': '#e4e4e7',
  
  // Focus ring
  '--focus-color': digipajaOrange,
  
  // State colors  
  '--state-info-color': digipajaOrange,
  '--state-success-color': '#22c55e',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#ef4444',
  
  // Navbar
  '--main-navigation-color': '#050609',
  '--main-navigation-color--inverted': '#f4f4f5',
  
  // Default button
  '--default-button-color': '#18181b',
  '--default-button-primary-color': digipajaOrange,
  '--default-button-success-color': '#22c55e',
  '--default-button-warning-color': '#f59e0b', 
  '--default-button-danger-color': '#ef4444',
})

// Custom Digipaja Studio icon
function DigipajaLogo() {
  return (
    <svg 
      width="1em" 
      height="1em" 
      viewBox="0 0 100 100" 
      fill="none"
    >
      <path 
        d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" 
        fill="#ff8a3c"
        stroke="#ff6b00"
        strokeWidth="3"
      />
      <text 
        x="50" 
        y="65" 
        textAnchor="middle" 
        fill="#000" 
        fontSize="42" 
        fontWeight="bold"
        fontFamily="system-ui"
      >
        D
      </text>
    </svg>
  )
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Digipaja CMS',
  
  // Custom icon shown in the navbar
  icon: DigipajaLogo,
  
  // Custom theme
  theme: digipajaTheme,
  
  // Sanity v3 schema definition
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
