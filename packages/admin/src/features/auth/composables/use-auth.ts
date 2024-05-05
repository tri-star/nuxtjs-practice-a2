import { defineStore } from 'pinia'
import { requestLogin } from '~/features/auth/clients/auth-api-client'

export const useAuthStore = defineStore('useAuthStore', () => {
  const token = ref<string | null>(null)

  async function login(loginId: string, password: string) {
    return requestLogin(loginId, password)
  }

  function isLoggedIn() {
    return token.value !== null
  }

  return {
    login,
    isLoggedIn,
  }
})
