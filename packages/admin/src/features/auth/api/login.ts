import type { Result } from 'neverthrow'
import { err, ok } from 'neverthrow'
import { createAppApiClient } from '~/lib/api/client'
import type { ApplicationError } from '~/lib/error/app-error'
import { toAppErrorOrThrow } from '~/lib/error/app-error'

export async function requestLogin(loginId: string, password: string): Promise<Result<string, ApplicationError>> {
  try {
    const client = createAppApiClient()
    const response = await client.post('/admin/auth/login', {
      loginId,
      password,
    })
    return ok(response.token)
  } catch (e) {
    const appError = toAppErrorOrThrow(e)
    return err(appError)
  }
}
