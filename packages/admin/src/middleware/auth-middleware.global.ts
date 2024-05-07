import { useAuthStore } from '~/features/auth/composables/use-auth'

export default defineNuxtRouteMiddleware((to) => {
  if (to.name === 'login') {
    return
  }

  if (import.meta.server) return

  const authStore = useAuthStore()
  console.log('validate')
  if (!authStore.isLoggedIn()) {
    console.log('not logged in')
    return navigateTo({ name: 'login' })
  }
  console.log('valid user')
})
