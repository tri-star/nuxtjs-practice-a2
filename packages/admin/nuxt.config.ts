// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/devtools',
    'nuxt-mdi',
  ],
  typescript: {
    tsConfig: {
      include: ['../.eslintrc.cjs'],
    },
  },
  components: {
    dirs: [],
  },
  runtimeConfig: {
    API_HOST: '',
  },
  // routeRules: {},
})
