import { setupWorker } from 'msw/browser'
import { getRequestLoginMockHandler } from '~/features/auth/api/login'
export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  if (runtimeConfig.public.useApiStub) {
    const worker = setupWorker(getRequestLoginMockHandler())
    await worker.start()
  }
})
