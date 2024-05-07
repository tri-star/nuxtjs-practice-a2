import { defineEventHandler } from 'h3'
import { z } from 'zod'
import axios from 'axios'

const loginRequestSchema = z.object({
  loginId: z.string(),
  password: z.string(),
})

const loginResponseSchema = z.object({
  token: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const requestJson = loginRequestSchema.parse(body)

  try {
    const response = await axios.post('/admin/auth/login', requestJson)
    return loginResponseSchema.parse(response.data)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status) {
        console.log(e.response)
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
