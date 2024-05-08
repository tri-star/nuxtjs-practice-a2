import { useAuthStore } from '~/features/auth/composables/use-auth'

export default defineNuxtRouteMiddleware((to) => {
  if (to.name === 'login') {
    return
  }

  if (import.meta.server) return

  const authStore = useAuthStore()
  if (!authStore.isLoggedIn()) {
    return navigateTo({ name: 'login' })
  }
})
