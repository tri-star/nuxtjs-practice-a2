<script setup lang="ts">
import A2MenuItem from '~/components/A2MenuItem.vue'
import type { A2MenuItem as MenuItemType } from '~/components/a2-menu-item'

const { adjustPositionToBounds } = useAnchorPosition()

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

      if (menuListRef.value) {
        const adjustedRect = adjustPositionToBounds(menuListRef as Ref<HTMLElement>)
        menuListRef.value.style.left = `${adjustedRect.left}px`
        menuListRef.value.style.top = `${adjustedRect.top}px`
      }
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
  <div v-show="isOpen" ref="menuListRef" class="fixed">
    <ul class="flex flex-col items-start p-2 rounded border-menu-border shadow-md bg-menu-default backdrop-blur-md">
      <A2MenuItem v-for="item in items" :key="item.id" :item="item" @click="handleClickItem" />
    </ul>
  </div>
</template>
