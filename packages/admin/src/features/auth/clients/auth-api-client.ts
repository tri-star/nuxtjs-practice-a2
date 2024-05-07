import z from 'zod'
import { createApiResult } from '~/lib/api/api-result'

export const SERVER_API_ROUTES = {
  LOGIN: '/api/auth/login',
}

const loginResponseSchema = z.object({
  token: z.string(),
})

export async function requestLogin(loginId: string, password: string) {
  const { data, error } = await useFetch(SERVER_API_ROUTES.LOGIN, {
    method: 'POST',
    body: { loginId, password },
  })

  if (error.value) {
    return createApiResult<string>(null, error.value)
  }

  const parsedJson = loginResponseSchema.parse(data.value)
  return createApiResult<string>(parsedJson.token, null)
}
