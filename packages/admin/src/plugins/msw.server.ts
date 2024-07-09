import { setupServer } from 'msw/node'
import { getFetchAdminSelfMockHandler } from '~/features/admin-users/api/fetch-admin-self'
import { getRequestLoginMockHandler } from '~/features/auth/api/login'
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  if (runtimeConfig.public.useApiStub) {
    const server = setupServer(getRequestLoginMockHandler(), getFetchAdminSelfMockHandler())
    server.listen()
  }
})
