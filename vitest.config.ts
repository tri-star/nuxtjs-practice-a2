import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    includeSource: ['**/__tests__/**/*.spec.ts'],
  },
})
