import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('body', body)
  event.node.res.statusCode = 401
})
