import axios from 'axios'

export default defineNuxtPlugin({
  async setup(nuxtApp) {
    axios.defaults.baseURL = nuxtApp.$config.API_HOST
  },
})
