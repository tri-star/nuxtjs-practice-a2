import { useDefaultLayoutStore } from '~/layouts/parts/default/use-default-layout'

export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.defaultLayoutOption === undefined) {
    return
  }

  const pinia = usePinia()

  const defaultLayoutStore = useDefaultLayoutStore(pinia)

  const { pageTitle } = storeToRefs(defaultLayoutStore)

  pageTitle.value = to.meta.defaultLayoutOption.pageTitle
  defaultLayoutStore.setActiveMenu(to.meta.defaultLayoutOption.activeMenu)
})
