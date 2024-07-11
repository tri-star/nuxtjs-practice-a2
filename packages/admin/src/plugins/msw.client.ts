import { setupWorker } from 'msw/browser'
import { getFetchAdminSelfMockHandler } from '~/features/admin-users/api/fetch-admin-self'
import { getRequestLoginMockHandler } from '~/features/auth/api/login'
export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  if (runtimeConfig.public.useApiStub) {
    const worker = setupWorker(getRequestLoginMockHandler(), getFetchAdminSelfMockHandler())
    await worker.start()
  }
})
