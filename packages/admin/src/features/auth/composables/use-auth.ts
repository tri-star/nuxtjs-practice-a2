import { defineStore } from 'pinia'
import { requestLogin } from '~/features/auth/clients/auth-api-client'
import { createApiResult } from '~/lib/api/api-result'

const AUTH_TOKEN_KEY = 'auth-token'

export const useAuthStore = defineStore('useAuthStore', () => {
  const token = ref<string | null>(null)

  async function login(loginId: string, password: string) {
    const result = await requestLogin(loginId, password)

    if (result.success === false) {
      return result
    }

    if (result.data === '') {
      return createApiResult(null, 'トークンが空です。')
    }
    const newToken = result.data
    token.value = newToken
    window.localStorage.setItem(AUTH_TOKEN_KEY, newToken)
    return createApiResult(newToken, null)
  }

  function isLoggedIn() {
    if (token.value === null) {
      token.value = window.localStorage.getItem(AUTH_TOKEN_KEY) ?? null
    }
    return token.value !== null
  }

  return {
    login,
    isLoggedIn,
  }
})
