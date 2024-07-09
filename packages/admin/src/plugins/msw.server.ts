import { setupServer } from 'msw/node'
import { getRequestLoginMockHandler } from '~/features/auth/api/login'
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  if (runtimeConfig.public.useApiStub) {
    const server = setupServer(getRequestLoginMockHandler())
    server.listen()
  }
})
