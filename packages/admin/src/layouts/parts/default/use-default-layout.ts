import type { RouteLocationRaw } from 'vue-router'

export type MenuItem = {
  name: DefaultLayoutMenuId
  title: string
  icon: string
  to: RouteLocationRaw
}

const DEFAULT_LAYOUT_MENU_ID_LIST = ['dashboard', 'users'] as const
export type DefaultLayoutMenuId = (typeof DEFAULT_LAYOUT_MENU_ID_LIST)[number]
export const DEFAULT_LAYOUT_MENU_ID_MAP = DEFAULT_LAYOUT_MENU_ID_LIST.reduce<
  { [k in DefaultLayoutMenuId]: k } | Record<string, unknown>
>((acc, menuId) => {
  acc[menuId] = menuId
  return acc
}, {}) as { [k in DefaultLayoutMenuId]: k }

export const useDefaultLayoutStore = defineStore('defaultLayoutStore', () => {
  const expanded = ref(true)
  const _activeMenu = ref<DefaultLayoutMenuId | undefined>(undefined)
  const pageTitle = ref<string | undefined>(undefined)

  const menuItems = computed<MenuItem[]>(() => [
    {
      name: DEFAULT_LAYOUT_MENU_ID_MAP.dashboard,
      title: 'ダッシュボード',
      icon: 'mdi:view-dashboard',
      to: '/',
    },
    {
      name: DEFAULT_LAYOUT_MENU_ID_MAP.users,
      title: 'ユーザー管理',
      icon: 'mdi:account',
      to: '/',
    },
  ])

  const activeMenu = computed(() => {
    if (_activeMenu.value === undefined) {
      throw new Error('メニューIDがセットされていません')
    }
    return _activeMenu.value
  })

  function setActiveMenu(menuId: DefaultLayoutMenuId) {
    _activeMenu.value = menuId
  }

  function toggleMenu() {
    expanded.value = !expanded.value
  }

  return {
    expanded,
    menuItems,
    activeMenu,
    pageTitle,

    setActiveMenu,
    toggleMenu,
  }
})
