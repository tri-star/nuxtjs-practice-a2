export function isOneOf<T>(value: T, options: T[]) {
  return options.includes(value as T)
}
