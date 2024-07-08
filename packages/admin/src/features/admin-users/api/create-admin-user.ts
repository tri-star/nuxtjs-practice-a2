import { parse } from '@formkit/tempo'
import { type AdminUser, type CreateAdminUserValidation } from '~/features/admin-users/domain/admin-user'
import { createAppApiClient } from '~/lib/api/client'
import { toAppError } from '~/lib/error/app-error'
import { http, HttpResponse } from 'msw'
import type { UnwrapPromise } from '~/lib/utils/type'
import { ulid } from 'ulid'

export async function createAdminUser(requestData: CreateAdminUserValidation) {
  try {
    const client = createAppApiClient()
    const response = await client.post('/admin/admin-users', {
      name: requestData.name,
      loginId: requestData.loginId,
      password: requestData.password,
    })

    const createdUser: AdminUser = {
      id: response.id,
      name: response.name,
      loginId: response.loginId,
      createdAt: response.createdAt ? parse(response.createdAt) : undefined,
      updatedAt: response.updatedAt ? parse(response.updatedAt) : undefined,
    }

    return createdUser
  } catch (e) {
    throw toAppError(e)
  }
}

export function getCreateAdminUserMockHandler() {
  const client = createAppApiClient()
  type ApiFunc = typeof client.post<'/admin/admin-users', object>

  return http.post<object, Parameters<ApiFunc>[1]>('/admin/admin-users', async ({ request }) => {
    const json = await request.json()

    // const validLoginId = 'test'
    // const validPass = 'abcdabcd123'
    // if (json.loginId !== validLoginId || json.password !== validPass) {
    //   return HttpResponse.json(
    //     {
    //       message: '',
    //     },
    //     { status: 403 },
    //   )
    // }

    return HttpResponse.json({
      id: ulid(),
      name: json.name,
      loginId: json.loginId,
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    } satisfies UnwrapPromise<ReturnType<ApiFunc>>)
  })
}
