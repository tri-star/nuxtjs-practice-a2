import { z } from 'zod'

export const adminUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  loginId: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type AdminUser = z.infer<typeof adminUserSchema>

export const createAdminUserValidationSchema = z.object({
  name: z.string().min(1),
  loginId: z.string().min(4),
  password: z.string().min(8),
})
export type CreateAdminUserValidation = z.infer<typeof createAdminUserValidationSchema>
