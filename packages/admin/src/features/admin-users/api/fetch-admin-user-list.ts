import { parse } from '@formkit/tempo'
import type { AdminUserListResponse } from '~/features/admin-users/domain/admin-user-list-entry'
import { createAppApiClient } from '~/lib/api/client'
import { requestJson } from '~/lib/api/ofetch'
import { toAppError } from '~/lib/error/app-error'

export function fetchAdminUserList() {
  const { data, error, pending } = useAsyncData('AdminUserList', async () => {
    try {
      const client = createAppApiClient()
      const response = await client.get('/admin/admin-users')

      const userList: AdminUserListResponse = {
        data: response.data.map((user) => {
          return {
            id: user.id,
            name: user.name,
            loginId: user.loginId,
            createdAt: user.createdAt ? parse(user.createdAt) : undefined,
            updatedAt: user.updatedAt ? parse(user.updatedAt) : undefined,
          }
        }),
        count: response.count,
      }

      return userList
    } catch (e) {
      throw toAppError(e)
    }
  })

  return {
    adminUserList: data,
    adminUserListError: error,
    isAdminUserListPending: pending,
  }
}
