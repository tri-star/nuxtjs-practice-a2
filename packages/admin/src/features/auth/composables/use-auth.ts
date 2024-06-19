import { ok, type Result } from 'neverthrow'
import { defineStore } from 'pinia'
import { fetchAdminSelf } from '~/features/admin-users/api/fetch-admin-self'
import type { AdminUser } from '~/features/admin-users/domain/admin-user'
import { requestLogin } from '~/features/auth/api/login'
import type { ApplicationError } from '~/lib/error/app-error'
import { UnexpectedError } from '~/lib/error/app-error'

const AUTH_TOKEN_KEY = 'auth-token'

export const useAuthStore = defineStore('useAuthStore', () => {
  const token = ref<string | null>(null)
  const user = ref<AdminUser | null>(null)

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
    user.value = (await fetchAdminSelf()).value
    return ok(newToken)
  }

  async function loadSelf() {
    user.value = (await fetchAdminSelf()).value
  }

  async function isLoggedIn() {
    if (token.value === null) {
      token.value = window.localStorage.getItem(AUTH_TOKEN_KEY) ?? null
    }
    if (user.value === null) {
      await loadSelf()
    }
    return user.value !== null
  }

  return {
    token,
    login,
    loadSelf,
    isLoggedIn,
  }
})
