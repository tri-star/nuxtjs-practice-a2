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

export type ApiResult<T, E> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: ApiError<E>
    }

export function createApiResult<T, E = unknown>(
  data: T | null | undefined,
  error: E | null | undefined,
): ApiResult<T, E> {
  if (error) {
    return {
      success: false,
      error: new ApiError(error),
    }
  }
  return {
    success: true,
    data: data as T,
  }
}

export class ApiError<E = unknown> extends Error {
  public static NAME = 'A2_API_ERROR'
  private error: E

  constructor(error: E) {
    super()
    this.error = error
  }

  static isApiError<E>(e: unknown): e is ApiError<E> {
    return e instanceof ApiError
  }

  getStatusCode() {
    if (!this.isHttpErrorInner(this.error)) {
      return null
    }
    return this.error.statusCode
  }

  isHttpError() {
    return this.isHttpErrorInner(this.error)
  }

  isClientError() {
    return [400, 401, 404, 429].includes(this.getStatusCode() ?? 0)
  }

  isServerError() {
    const statusCodePrefix = Math.floor((this.getStatusCode() ?? 0) / 100)
    return statusCodePrefix === 5
  }

  isSystemError() {
    return !this.isHttpError()
  }

  isHttpUnAuthorized() {
    return this.getStatusCode() === 401
  }

  isHttpNotFound() {
    return this.getStatusCode() === 404
  }
  guessErrorTypeFromStatusCode() {
    if (!this.isHttpError()) {
      return ERROR_TYPE_MAP.SYSTEM
    }
    switch (this.getStatusCode()) {
      case 404:
        return ERROR_TYPE_MAP.NOT_FOUND
      case 401:
        return ERROR_TYPE_MAP.UNAUTHORIZED
      case 500:
        return ERROR_TYPE_MAP.SERVER_ERROR
    }
    return ERROR_TYPE_MAP.OTHER_HTTP_ERROR
  }

  private isHttpErrorInner(e: unknown): e is FetchError {
    return (e as FetchError).statusCode !== undefined
  }
}
