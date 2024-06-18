import { useAuthStore } from '~/features/auth/composables/use-auth'
import { createApiClient } from '~/lib/api/client.generated'

export function createAppApiClient() {
  const config = useRuntimeConfig()
  const { token } = useAuthStore()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return createApiClient(config.public.apiHost, {
    axiosConfig: {
      headers,
    },
  })
}
