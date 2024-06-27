import { createAppApiClient } from '~/lib/api/client'
import { toAppError } from '~/lib/error/app-error'

export async function deleteAdminUser(adminUserIds: string[]) {
  try {
    const client = createAppApiClient()
    for (const id of adminUserIds) {
      await client.delete('/admin/admin-users/:id', undefined, { params: { id } })
    }
  } catch (e) {
    throw toAppError(e)
  }
}
