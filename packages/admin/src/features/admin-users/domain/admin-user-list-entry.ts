import { z } from 'zod'

export const adminUserListEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  loginId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})
export type AdminUserListEntry = z.infer<typeof adminUserListEntrySchema>

export const adminUserListResponseSchema = z.object({
  data: z.array(adminUserListEntrySchema),
  count: z.number(),
})
export type AdminUserListResponse = z.infer<typeof adminUserListResponseSchema>
