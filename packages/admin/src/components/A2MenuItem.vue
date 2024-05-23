<script setup lang="ts">
import type { A2MenuItem } from '~/components/a2-menu-item'

const props = defineProps<{
  item: A2MenuItem
}>()

const emit = defineEmits<{
  click: [id: string]
}>()

function handleClick() {
  emit('click', props.item.id)
}
</script>

<template>
  <div
    class="flex items-start w-full p-2 gap-2 rounded-md hover:bg-menu-hover cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden"
    @click="handleClick"
  >
    {{ item.label }}
  </div>
</template>
