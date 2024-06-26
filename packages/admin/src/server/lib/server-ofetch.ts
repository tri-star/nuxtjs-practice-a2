import { ofetch } from 'ofetch'

export function createClientForServer() {
  const config = useRuntimeConfig()

  return ofetch.create({
    baseURL: config.apiHost ?? '',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
