import { err, ok, type Result } from 'neverthrow'
import { useAuthStore } from '~/features/auth/composables/use-auth'
import { UnexpectedError, toAppError, type ApplicationError } from '~/lib/error/app-error'

export async function requestJson<T = unknown>(url: string, options?: Parameters<typeof $fetch>[1]) {
  try {
    const pinia = usePinia()
    const { token } = useAuthStore(pinia)
    const {
      public: { API_HOST },
    } = useRuntimeConfig()

    const mergedOptions: Parameters<typeof $fetch>[1] = {
      ...(options ?? {}),
      baseURL: API_HOST,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    }

    console.log(API_HOST, mergedOptions)

    const response = await $fetch<T>(url, mergedOptions)
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
    const pinia = usePinia()
    const { token } = useAuthStore(pinia)

    const mergedOptions = {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await $fetch<T>(url, mergedOptions)
    return ok(response)
  } catch (e) {
    const apiError = toAppError(e)
    if (apiError instanceof UnexpectedError) {
      throw apiError
    }
    return err(apiError)
  }
}
