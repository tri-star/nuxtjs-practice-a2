import { isAxiosError } from 'axios'

export const UNEXPECTED_ERROR_TYPES = [
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'SERVER_ERROR',
  'OTHER_HTTP_ERROR',
  'SCRIPT_ERROR',
] as const
export type UnexpectedErrorType = (typeof ERROR_TYPES)[number]

export const APPLICATION_ERROR_TYPES = ['APP_ERROR'] as const
export type ApplicationErrorType = (typeof APPLICATION_ERROR_TYPES)[number]

export const ERROR_TYPES = [...UNEXPECTED_ERROR_TYPES, ...APPLICATION_ERROR_TYPES] as const

export type ErrorType = (typeof ERROR_TYPES)[number]

export const ERROR_TYPE_MAP = ERROR_TYPES.reduce<{ [k in ErrorType]: k } | Record<string, unknown>>(
  (acc, errorType) => {
    acc[errorType] = errorType
    return acc
  },
  {},
) as { [k in ErrorType]: k }

export type UnexpectedErrorData = {
  type: UnexpectedErrorType
  statusCode?: number
  message: string
  originalError: unknown
}

export type ApplicationErrorData<T> = {
  type: ApplicationErrorType
  detail: T
}

export type AppErrorData<T = unknown> = UnexpectedErrorData | ApplicationErrorData<T>

export class ApplicationError<T = unknown> {
  public readonly data: ApplicationErrorData<T>

  constructor(data: ApplicationErrorData<T>) {
    this.data = data
  }

  toJSON() {
    return JSON.stringify(this.data)
  }
}

export class UnexpectedError {
  public readonly data: UnexpectedErrorData

  constructor(data: UnexpectedErrorData) {
    this.data = data
  }

  get errorType() {
    return this.data.type
  }

  static createScriptError(message: string, error: unknown) {
    return new UnexpectedError({
      type: 'SCRIPT_ERROR',
      statusCode: 0,
      message,
      originalError: error,
    })
  }

  toJSON() {
    return JSON.stringify(this.data)
  }
}

export function toAppErrorOrThrow<T>(error: unknown) {
  const appError = toAppError<T>(error)
  if (appError instanceof UnexpectedError) {
    throw appError
  }
  return appError
}

export function toAppError<T = unknown>(error: unknown) {
  if (error instanceof UnexpectedError) {
    return error
  }
  if (error instanceof ApplicationError) {
    return error
  }
  if (!isAxiosError(error)) {
    return UnexpectedError.createScriptError('スクリプトエラー', error)
  }
  if (error.response?.status === 400) {
    const body = error.response?.data as { appError?: unknown } | undefined
    if (body?.appError != null) {
      return new ApplicationError<T>({
        type: 'APP_ERROR',
        detail: body.appError as T,
      })
    } else {
      return new UnexpectedError({
        type: 'BAD_REQUEST',
        statusCode: 400,
        message: 'リクエストに失敗しました',
        originalError: error,
      })
    }
  } else if (error.response?.status === 404) {
    return new UnexpectedError({
      type: 'NOT_FOUND',
      statusCode: 404,
      message: 'リソースが見つかりません',
      originalError: error,
    })
  } else if (error.response?.status === 401) {
    return new UnexpectedError({
      type: 'UNAUTHORIZED',
      statusCode: 401,
      message: '認証に失敗しました',
      originalError: error,
    })
  } else if (error.response?.status === 500) {
    return new UnexpectedError({
      type: 'SERVER_ERROR',
      statusCode: 500,
      message: 'リクエスト中にエラーが発生しました',
      originalError: error,
    })
  } else {
    return new UnexpectedError({
      type: 'OTHER_HTTP_ERROR',
      statusCode: error.response?.status,
      message: 'リクエスト中にエラーが発生しました',
      originalError: error,
    })
  }
}
