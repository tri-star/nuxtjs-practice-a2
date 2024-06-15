import { ok, type Result } from 'neverthrow'
import { z } from 'zod'
import { requestJsonAsResult } from '~/lib/api/ofetch'
import type { ApplicationError } from '~/lib/error/app-error'

const validateLoginIdResponseSchema = z.object({
  valid: z.boolean(),
})

export async function validateAdminUserLoginId(loginId: string): Promise<Result<boolean, ApplicationError>> {
  const result = await requestJsonAsResult('/admin/auth/validate-login-id', {
    method: 'get',
    query: { loginId },
  })

  return result.andThen((data) => {
    const parsedJson = validateLoginIdResponseSchema.parse(data)
    return ok(parsedJson.valid)
  })
}
