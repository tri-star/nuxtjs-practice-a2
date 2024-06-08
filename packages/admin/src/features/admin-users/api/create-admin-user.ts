import { z } from 'zod'
import { adminUserSchema, type CreateAdminUserValidation } from '~/features/admin-users/domain/admin-user'
import { requestJson } from '~/lib/api/ofetch'

export const createUserResponseSchema = z.object({
  data: adminUserSchema,
})
type CreateUserResponse = z.infer<typeof createUserResponseSchema>

export function createAdminUser(requestData: CreateAdminUserValidation) {
  return requestJson<CreateUserResponse>('/admin/admin-users', {
    method: 'POST',
    body: requestData,
  })
}
