import { useAuthStore } from '~/features/auth/composables/use-auth'

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name === 'login') {
    return
  }

  const authStore = useAuthStore()
  if (!(await authStore.isLoggedIn())) {
    return navigateTo({ name: 'login' })
  }
})
