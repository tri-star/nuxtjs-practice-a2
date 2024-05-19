import type { DefaultLayoutMenuId } from '~/layouts/parts/default/use-default-layout'

declare module '#app' {
  interface PageMeta {
    defaultLayoutOption?: {
      pageTitle: string
      activeMenu: DefaultLayoutMenuId
    }
  }
}

export {}
