// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/test-utils/module'],
  typescript: {
    tsConfig: {
      include: ['../.eslintrc.cjs'],
    },
  },
  test: true,
  runtimeConfig: {
    API_HOST: '',
  },
})
