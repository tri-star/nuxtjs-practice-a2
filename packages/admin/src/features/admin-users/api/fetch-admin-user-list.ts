import type { AdminUserListResponse } from '~/features/admin-users/domain/admin-user-list-entry'
import { requestJson } from '~/lib/api/ofetch'

export function fetchAdminUserList() {
  const { data, error, pending } = useAsyncData('AdminUserList', async () => {
    return requestJson<AdminUserListResponse>('/admin/admin-users')
  })

  return {
    rawAdminUserList: data,
    rawAdminUserListError: error,
    isAdminUserListPending: pending,
  }
}
