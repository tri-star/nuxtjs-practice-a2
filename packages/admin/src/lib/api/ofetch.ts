import { err, ok, type Result } from 'neverthrow'
import type { FetchOptions } from 'ofetch'
import { useAuthStore } from '~/features/auth/composables/use-auth'
import { UnexpectedError, toAppError, type ApplicationError } from '~/lib/error/app-error'
import { createClientForFront } from '~/server/lib/front-ofetch'

export async function requestJson<T = unknown>(url: string, options?: Parameters<typeof $fetch>[1]) {
  try {
    // const pinia = usePinia()
    const { token } = useAuthStore()
    const config = useRuntimeConfig()

    const mergedOptions: Parameters<typeof $fetch>[1] = {
      ...(options ?? {}),
      baseURL: config.public.apiHost,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    }

    const client = createClientForFront()
    const response = await client<T>(url, mergedOptions as FetchOptions<'json'>)
    return response
  } catch (e) {
    throw toAppError(e)
  }
}

export async function requestJsonAsResult<T = unknown>(
  url: string,
  options: Parameters<typeof $fetch>[1] | undefined,
): Promise<Result<T, ApplicationError>> {
  try {
    const { token } = useAuthStore()
    const config = useRuntimeConfig()

    const mergedOptions = {
      ...(options ?? {}),
      baseURL: config.public.apiHost,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    }

    const client = createClientForFront()
    const response = await client<T>(url, mergedOptions as FetchOptions<'json'>)
    return ok(response)
  } catch (e) {
    const apiError = toAppError(e)
    if (apiError instanceof UnexpectedError) {
      throw apiError
    }
    return err(apiError)
  }
}
