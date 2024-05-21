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
    'nuxt-icon',
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
    public: {
      API_HOST: '',
    },
  },
  routeRules: {
    '/admin-users': { ssr: false },
  },
})
