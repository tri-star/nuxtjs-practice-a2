import { type EditAdminUserValidation } from '~/features/admin-users/domain/admin-user'
import { createAppApiClient } from '~/lib/api/client'
import { toAppError } from '~/lib/error/app-error'

export async function updateAdminUser(adminUserId: string, requestData: EditAdminUserValidation) {
  try {
    const client = createAppApiClient()
    await client.put(
      '/admin/admin-users/:id',
      {
        name: requestData.name,
        loginId: requestData.loginId,
      },
      {
        params: {
          id: adminUserId,
        },
      },
    )
  } catch (e) {
    throw toAppError(e)
  }
}
