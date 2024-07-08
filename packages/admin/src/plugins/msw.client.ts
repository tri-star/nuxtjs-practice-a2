import { setupWorker } from 'msw/browser'
import { getRequestLoginMockHandler } from '~/features/auth/api/login'
export default defineNuxtPlugin(async () => {
  if (import.meta.dev) {
    const worker = setupWorker(getRequestLoginMockHandler())
    await worker.start()
  }
})
