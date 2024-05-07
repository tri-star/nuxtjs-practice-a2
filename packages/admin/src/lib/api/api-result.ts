import type { FetchError } from 'ofetch'

const errorTypes = [
  'SYSTEM', // アプリ内部でのエラー
  'UNAUTHORIZED',
  'NOT_FOUND',
  'SERVER_ERROR',
  'OTHER_HTTP_ERROR',
] as const
export type ErrorType = (typeof errorTypes)[number]
export const ERROR_TYPE_MAP = errorTypes.reduce<{ [k in ErrorType]: k } | Record<string, unknown>>((acc, code) => {
  acc[code] = code
  return acc
}, {}) as { [k in ErrorType]: k }

type ApiError<E = unknown> = {
  success: false
  type: ErrorType
  isHttpError: boolean
  error: E
}

export type ApiResult<T, E> =
  | {
      success: true
      data: T
    }
  | ApiError<E>

export function createApiResult<T, E = unknown>(
  data: T | null | undefined,
  error: E | null | undefined,
): ApiResult<T, E> {
  console.log('createApiResult', JSON.stringify(error))
  if ((error as FetchError)?.statusCode) {
    console.log('http error')
    return {
      success: false,
      type: guessErrorTypeFromStatusCode((error as FetchError).statusCode ?? 0),
      isHttpError: true,
      error: error as E,
    }
  } else if (error) {
    return {
      success: false,
      type: ERROR_TYPE_MAP.SYSTEM,
      isHttpError: false,
      error: error as E,
    }
  }
  return {
    success: true,
    data: data as T,
  }
}

function guessErrorTypeFromStatusCode(statusCode: number) {
  switch (statusCode) {
    case 404:
      return ERROR_TYPE_MAP.NOT_FOUND
    case 401:
      return ERROR_TYPE_MAP.UNAUTHORIZED
    case 500:
      return ERROR_TYPE_MAP.SERVER_ERROR
  }
  return ERROR_TYPE_MAP.OTHER_HTTP_ERROR
}

export function isHttpError<E = unknown>(e: unknown): e is ApiError<E> {
  const maybeError = e as ApiResult<unknown, E>
  if (maybeError?.success) {
    return false
  }
  return maybeError.isHttpError
}
