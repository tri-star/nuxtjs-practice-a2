import z from 'zod'

export const SERVER_API_ROUTES = {
  LOGIN: '/api/auth/login',
}

const loginResponseSchema = z.object({
  token: z.string(),
})

export async function requestLogin(loginId: string, password: string) {
  const resultJson = await $fetch(SERVER_API_ROUTES.LOGIN, {
    method: 'POST',
    body: {
      loginId,
      password,
    },
  })

  const parsedJson = loginResponseSchema.parse(resultJson)
  return parsedJson.token
}
