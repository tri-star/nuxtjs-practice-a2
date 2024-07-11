// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',

  nitro: {
    preset: 'aws-lambda',
  },

  devtools: {
    enabled: false,

    timeline: {
      enabled: false,
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
    apiHost: '',
    useApiStub: false,
    public: {
      apiHost: process.env.NUXT_PUBLIC_API_HOST,
      useApiStub: process.env.NUXT_PUBLIC_USE_API_STUB === 'true',
    },
  },

  ssr: false,
  routeRules: {
    // '/admin-users': { ssr: false },
  },

  compatibilityDate: '2024-07-08',
})
