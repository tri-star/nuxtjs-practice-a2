<script setup lang="ts">
import SideMenuItem from '~/layouts/parts/default/SideMenuItem.vue'
import { useDefaultLayoutStore, type DefaultLayoutMenuId } from '~/layouts/parts/default/use-default-layout'

const defaultLayoutStore = useDefaultLayoutStore()
const { expanded, menuItems, activeMenu } = storeToRefs(defaultLayoutStore)

const menuListClass = computed(() => {
  return [
    'sticky',
    'top-0',
    'flex', //
    'flex-col',
    'items-start',
    'gap-1',
    expanded.value ? 'w-72' : 'w-20',
    'bg-side-menu-background',
    'h-full',
    'p-2',
    'transition-all',
    'duration-300',
    'ease-out',
  ]
})

function isActive(menuId: DefaultLayoutMenuId) {
  return menuId === activeMenu.value
}
</script>

<template>
  <aside :class="menuListClass" class="transition">
    <SideMenuItem v-for="menu in menuItems" :key="menu.title" :item="menu" :active="isActive(menu.name)" />
  </aside>
</template>
