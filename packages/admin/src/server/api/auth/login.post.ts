import { defineEventHandler } from 'h3'
import { z } from 'zod'
import { FetchError } from 'ofetch'
import { createClientForServer } from '~/server/lib/server-ofetch'

const loginRequestSchema = z.object({
  loginId: z.string(),
  password: z.string(),
})

const loginResponseSchema = z.object({
  token: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const requestBody = loginRequestSchema.parse(body)

    const client = createClientForServer()
    const responseData = await client('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    event.node.res.statusCode = 200
    return loginResponseSchema.parse(responseData)
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.response?.status) {
        event.node.res.statusCode = e.response.status
        return {
          message: e.message,
        }
      }
    } else {
      event.node.res.statusCode = 500
      return {
        message: (e as Error)?.message ?? e,
      }
    }
  }
})
