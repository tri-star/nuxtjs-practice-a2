import { http, HttpResponse } from 'msw'
import { err, ok, type Result } from 'neverthrow'
import { createAppApiClient } from '~/lib/api/client'
import { toAppErrorOrThrow, type ApplicationError } from '~/lib/error/app-error'
import { buildMockUrl } from '~/lib/msw/msw-url'
import type { UnwrapPromise } from '~/lib/utils/type'

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

export function getValidateAdminUserLoginIdMockHandler() {
  const client = createAppApiClient()
  type ApiFunc = typeof client.get<'/admin/auth/validate-login-id', { queries: { loginId: string } }>

  return http.post<object, Parameters<ApiFunc>[1]>(buildMockUrl('/admin/auth/validate-login-id'), async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return HttpResponse.json({
      valid: true,
    } satisfies UnwrapPromise<ReturnType<ApiFunc>>)
  })
}
