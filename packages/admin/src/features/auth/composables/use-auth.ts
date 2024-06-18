import { ok, type Result } from 'neverthrow'
import { defineStore } from 'pinia'
import { requestLogin } from '~/features/auth/api/login'
import type { ApplicationError } from '~/lib/error/app-error'
import { UnexpectedError } from '~/lib/error/app-error'

const AUTH_TOKEN_KEY = 'auth-token'

export const useAuthStore = defineStore('useAuthStore', () => {
  const token = ref<string | null>(null)

  async function login(loginId: string, password: string): Promise<Result<string, ApplicationError>> {
    const result = await requestLogin(loginId, password)

    if (result.isErr()) {
      return result
    }
    const newToken = result.unwrapOr('')
    if (newToken === '') {
      throw UnexpectedError.createScriptError('トークンが空です', null)
    }
    token.value = newToken
    window.localStorage.setItem(AUTH_TOKEN_KEY, newToken)
    return ok(newToken)
  }

  function isLoggedIn() {
    if (token.value === null) {
      token.value = window.localStorage.getItem(AUTH_TOKEN_KEY) ?? null
    }
    return token.value !== null
  }

  return {
    token,
    login,
    isLoggedIn,
  }
})
