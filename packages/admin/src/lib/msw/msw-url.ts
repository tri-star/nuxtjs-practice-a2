export function buildMockUrl(path: string) {
  const runtimeConfig = useRuntimeConfig()
  return `${runtimeConfig.public.apiHost}${path}`
}
