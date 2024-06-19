import { parse } from '@formkit/tempo'
import type { AdminUser } from '~/features/admin-users/domain/admin-user'
import { createAppApiClient } from '~/lib/api/client'
import { toAppError } from '~/lib/error/app-error'

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
      throw toAppError(e)
    }
  })

  return data
}
