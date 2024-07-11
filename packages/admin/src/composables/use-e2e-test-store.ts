import type { AdminUser } from '~/features/admin-users/domain/admin-user'

export const useE2eTestStore = defineStore('e2eTestStore', () => {
  const loggedUser = ref<AdminUser | null>(null)

  return {
    loggedUser,
  }
})
