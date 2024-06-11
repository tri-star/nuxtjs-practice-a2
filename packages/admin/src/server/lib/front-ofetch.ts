import { ofetch } from 'ofetch'

export function createClientForFront() {
  const config = useRuntimeConfig()

  return ofetch.create({
    baseURL: config.public.apiHost ?? '',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
