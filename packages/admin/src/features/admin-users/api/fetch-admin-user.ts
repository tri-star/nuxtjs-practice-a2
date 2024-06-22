import { parse } from '@formkit/tempo'
import type { AdminUser } from '~/features/admin-users/domain/admin-user'
import { createAppApiClient } from '~/lib/api/client'
import { toAppError } from '~/lib/error/app-error'

export function fetchAdminUser(adminUserId: string) {
  const { data, error, pending } = useAsyncData(`AdminUser-${adminUserId}`, async () => {
    try {
      if (adminUserId.match(/[^0-9A-Za-z]+$/)) {
        throw new Error('無効なIDです')
      }

      const client = createAppApiClient()
      const response = await client.get('/admin/admin-users/:id', {
        params: { id: adminUserId },
      })

      const result: AdminUser = {
        id: response.id,
        name: response.name,
        loginId: response.loginId,
        createdAt: response.createdAt ? parse(response.createdAt) : undefined,
        updatedAt: response.updatedAt ? parse(response.updatedAt) : undefined,
      }
      return result
    } catch (e) {
      throw toAppError(e)
    }
  })

  return {
    adminUser: data,
    adminUserError: error,
    isAdminUserPending: pending,
  }
}
