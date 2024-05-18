import { ofetch } from 'ofetch'

export function createClientForServer() {
  const config = useRuntimeConfig()

  return ofetch.create({
    baseURL: config.API_HOST ?? '',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
