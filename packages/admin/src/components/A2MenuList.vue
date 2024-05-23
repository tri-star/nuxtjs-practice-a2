<script setup lang="ts">
import A2MenuItem from '~/components/A2MenuItem.vue'
import type { A2MenuItem as MenuItemType } from '~/components/a2-menu-item'

const menuListRef = ref<HTMLElement | null>(null)
const isOpen = defineModel<boolean>('open')

defineProps<{
  items: MenuItemType[]
}>()

const emit = defineEmits<{
  itemSelected: [id: string]
}>()

watch(isOpen, () => {
  if (isOpen.value) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    })
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

function handleClickOutside(e: MouseEvent) {
  if (menuListRef.value == null) {
    return
  }
  if (!menuListRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

function handleClickItem(itemId: string) {
  isOpen.value = false
  emit('itemSelected', itemId)
}
</script>

<template>
  <ul
    v-show="isOpen"
    ref="menuListRef"
    class="flex flex-col items-start p-2 rounded border-menu-border shadow-md bg-menu-default backdrop-blur-md min-w-full"
  >
    <A2MenuItem v-for="item in items" :key="item.id" :item="item" @click="handleClickItem" />
  </ul>
</template>
