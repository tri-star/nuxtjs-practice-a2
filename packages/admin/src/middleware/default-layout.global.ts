import { useDefaultLayoutStore } from '~/layouts/parts/default/use-default-layout'

export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.defaultLayoutOption === undefined) {
    console.log('skip')
    return
  }
  console.log('pass')

  const pinia = usePinia()

  const defaultLayoutStore = useDefaultLayoutStore(pinia)

  const { pageTitle } = storeToRefs(defaultLayoutStore)

  pageTitle.value = to.meta.defaultLayoutOption.pageTitle
  defaultLayoutStore.setActiveMenu(to.meta.defaultLayoutOption.activeMenu)
})
