import { FetchError } from 'ofetch'
import { createClientForServer } from '~/server/lib/server-ofetch'

export default defineEventHandler(async (event) => {
  try {
    const client = createClientForServer()
    const responseData = await client('/admin/users', {
      method: 'GET',
    })

    event.node.res.statusCode = 200
    return responseData
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.response?.status) {
        event.node.res.statusCode = e.response.status
        return await e.response.json()
      }
    } else {
      event.node.res.statusCode = 500
      return {
        success: false,
        message: (e as Error)?.message ?? e,
      }
    }
  }
})
