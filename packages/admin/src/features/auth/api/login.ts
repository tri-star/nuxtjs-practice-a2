import { http, HttpResponse } from 'msw'
import type { Result } from 'neverthrow'
import { err, ok } from 'neverthrow'
import { createAppApiClient } from '~/lib/api/client'
import type { ApplicationError } from '~/lib/error/app-error'
import { toAppErrorOrThrow } from '~/lib/error/app-error'
import { mswDb } from '~/lib/msw/factories'
import { buildMockUrl } from '~/lib/msw/msw-url'
import type { UnwrapPromise } from '~/lib/utils/type'

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

export function getRequestLoginMockHandler() {
  const client = createAppApiClient()
  type ApiFunc = typeof client.post<'/admin/auth/login', object>

  return http.post<object, Parameters<ApiFunc>[1]>(buildMockUrl('/admin/auth/login'), async ({ request }) => {
    const json = await request.json()

    await new Promise((resolve) => setTimeout(resolve, 500))

    const validLoginId = 'test'
    const validPass = 'abcdabcd123'
    if (json.loginId !== validLoginId || json.password !== validPass) {
      return HttpResponse.json(
        {
          message: 'auth error',
        },
        { status: 401 },
      )
    }

    mswDb.loggedAdminUser.deleteMany({ where: {} })
    mswDb.loggedAdminUser.create()

    return HttpResponse.json({
      token: 'dummy1234',
    } satisfies UnwrapPromise<ReturnType<ApiFunc>>)
  })
}
