import { parse } from '@formkit/tempo'
import { type AdminUser, type CreateAdminUserValidation } from '~/features/admin-users/domain/admin-user'
import { createAppApiClient } from '~/lib/api/client'
import { toAppError } from '~/lib/error/app-error'

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
