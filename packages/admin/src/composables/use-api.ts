import type { UseFetchOptions } from '#app'
import { useAuthStore } from '~/features/auth/composables/use-auth'

// 以下でより良いuseFetchのカスタマイズ法が見つかるまでのワークアラウンド
// https://github.com/nuxt/nuxt/issues/14736
// https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-usefetch

type RequestType = Parameters<typeof useFetch>[0]

export function useApi<T>(request: RequestType, options: UseFetchOptions<T>) {
  const { API_HOST } = useRuntimeConfig()

  const mergedOptions: typeof options = {
    baseURL: API_HOST,
    ...options,
  }

  const pinia = usePinia()
  const { token } = useAuthStore(pinia)
  if (token != null) {
    mergedOptions.headers = {
      ...mergedOptions.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return useFetch(request, mergedOptions)
}
