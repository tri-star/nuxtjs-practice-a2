import type { Result } from 'neverthrow'
import { ok } from 'neverthrow'
import z from 'zod'
import { requestJson } from '~/lib/api/ofetch'
import type { ApplicationError } from '~/lib/error/app-error'

export const SERVER_API_ROUTES = {
  LOGIN: '/api/auth/login',
}

const loginResponseSchema = z.object({
  token: z.string(),
})

export async function requestLogin(loginId: string, password: string): Promise<Result<string, ApplicationError>> {
  const result = await requestJson(SERVER_API_ROUTES.LOGIN, {
    method: 'POST',
    body: { loginId, password },
  })

  return result.andThen((data) => {
    const parsedJson = loginResponseSchema.parse(data)
    return ok(parsedJson.token)
  })
}
