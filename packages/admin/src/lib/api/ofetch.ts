import { err, ok, type Result } from 'neverthrow'
import { UnexpectedError, toAppError, type ApplicationError } from '~/lib/error/app-error'

export async function requestJson<T = unknown>(
  url: string,
  options: Parameters<typeof $fetch>[1],
): Promise<Result<T, ApplicationError>> {
  try {
    const response = await $fetch<T>(url, options)
    return ok(response)
  } catch (e) {
    const apiError = toAppError(e)
    if (apiError instanceof UnexpectedError) {
      throw apiError
    }
    return err(apiError)
  }
}
