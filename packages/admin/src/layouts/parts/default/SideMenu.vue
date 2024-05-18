<script setup lang="ts">
import SideMenuItem from '~/layouts/parts/default/SideMenuItem.vue'

const props = defineProps<{
  expanded: boolean
}>()

const menues = [
  {
    title: 'ダッシュボード',
    icon: 'mdi:view-dashboard',
    to: '/',
  },
  {
    title: 'ユーザー管理',
    icon: 'mdi:account',
  },
]

const menuListClass = computed(() => {
  return [
    'flex', //
    'flex-col',
    'items-start',
    'gap-1',
    props.expanded ? 'w-72' : 'w-16',
    'bg-side-menu-background',
    'h-full',
    'p-2',
  ]
})
</script>

<template>
  <aside :class="menuListClass">
    <SideMenuItem v-for="menu in menues" :key="menu.title" :item="menu" />
  </aside>
</template>
