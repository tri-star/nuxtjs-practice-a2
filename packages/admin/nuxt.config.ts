// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/test-utils/module', '@pinia/nuxt'],
  typescript: {
    tsConfig: {
      include: ['../.eslintrc.cjs'],
    },
  },
  components: {
    dirs: [],
  },
  test: true,
  runtimeConfig: {
    API_HOST: '',
  },
})
