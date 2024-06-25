import { err, ok, type Result } from 'neverthrow'
import { createAppApiClient } from '~/lib/api/client'
import { toAppErrorOrThrow, type ApplicationError } from '~/lib/error/app-error'

type ValidateLoginIdRequest = {
  loginId: string
  except?: string
}

export async function validateAdminUserLoginId(
  loginId: string,
  exceptAdminUserId?: string,
): Promise<Result<boolean, ApplicationError>> {
  try {
    const queries: ValidateLoginIdRequest = {
      loginId,
    }
    if (exceptAdminUserId) {
      queries['except'] = exceptAdminUserId
    }

    const client = createAppApiClient()
    const response = await client.get('/admin/auth/validate-login-id', {
      queries: queries,
    })
    return ok(response.valid)
  } catch (e) {
    const appError = toAppErrorOrThrow(e)
    return err(appError)
  }
}
