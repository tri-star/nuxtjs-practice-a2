import { z } from 'zod'

export const adminUserListEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  loginId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export type AdminUserListEntry = z.infer<typeof adminUserListEntrySchema>

export const adminUserListEntryResponseSchema = adminUserListEntrySchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type AdminUserListResponseEntry = z.infer<typeof adminUserListEntryResponseSchema>

export const adminUserListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(adminUserListEntryResponseSchema),
})
export type AdminUserListResponse = z.infer<typeof adminUserListResponseSchema>

export function transformToAdminUserListEntryResponse(user: AdminUserListEntry) {
  return adminUserListEntryResponseSchema.parse({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  })
}

export function transformToAdminUserListEntry(user: AdminUserListResponseEntry) {
  return adminUserListEntrySchema.parse({
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  })
}
