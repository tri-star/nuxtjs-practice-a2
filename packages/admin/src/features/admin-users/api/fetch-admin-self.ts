import { format, parse } from '@formkit/tempo'
import { http, HttpResponse } from 'msw'
import type { AdminUser } from '~/features/admin-users/domain/admin-user'
import { createAppApiClient } from '~/lib/api/client'
import { toAppError } from '~/lib/error/app-error'
import { buildMockUrl } from '~/lib/msw/msw-url'
import type { UnwrapPromise } from '~/lib/utils/type'

export async function fetchAdminSelf() {
  const { data } = await useAsyncData(`AdminSelf`, async () => {
    const client = createAppApiClient()

    try {
      const response = await client.get('/admin/admin-users/self')

      const result: AdminUser = {
        id: response.id,
        name: response.name,
        loginId: response.loginId,
        createdAt: response.createdAt ? parse(response.createdAt) : undefined,
        updatedAt: response.updatedAt ? parse(response.updatedAt) : undefined,
      }
      return result
    } catch (e) {
      const error = toAppError(e)
      if (error.data.type === 'UNAUTHORIZED') {
        return null
      }
      throw toAppError(e).toJSON()
    }
  })

  return data
}

export function getFetchAdminSelfMockHandler() {
  const client = createAppApiClient()
  type ApiFunc = typeof client.get<'/admin/admin-users/self', object>

  return http.get<object, Parameters<ApiFunc>[1]>(buildMockUrl('/admin/admin-users/self'), async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const e2eTestStore = useE2eTestStore()
    const { loggedUser } = storeToRefs(e2eTestStore)

    if (loggedUser.value == null) {
      return HttpResponse.json(
        {
          message: 'error',
        },
        { status: 401 },
      )
    }

    return HttpResponse.json({
      ...loggedUser.value,
      createdAt:
        loggedUser.value.createdAt !== undefined
          ? format(loggedUser.value.createdAt, 'YYYY-MM-DD HH:mm:ss')
          : undefined,
      updatedAt:
        loggedUser.value.createdAt !== undefined
          ? format(loggedUser.value.createdAt, 'YYYY-MM-DD HH:mm:ss')
          : undefined,
    } satisfies UnwrapPromise<ReturnType<ApiFunc>>)
  })
}
