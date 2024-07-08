import { setupServer } from 'msw/node'
import { getRequestLoginMockHandler } from '~/features/auth/api/login'
export default defineNuxtPlugin(() => {
  if (import.meta.dev) {
    const server = setupServer(getRequestLoginMockHandler())
    server.listen()
  }
})
