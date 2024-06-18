import { err, ok, type Result } from 'neverthrow'
import { createAppApiClient } from '~/lib/api/client'
import { toAppErrorOrThrow, type ApplicationError } from '~/lib/error/app-error'

export async function validateAdminUserLoginId(loginId: string): Promise<Result<boolean, ApplicationError>> {
  try {
    const client = createAppApiClient()
    const response = await client.get('/admin/auth/validate-login-id', {
      queries: { loginId },
    })
    return ok(response.valid)
  } catch (e) {
    const appError = toAppErrorOrThrow(e)
    return err(appError)
  }
}
