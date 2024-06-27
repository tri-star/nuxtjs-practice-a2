<script setup lang="ts">
import { tv } from 'tailwind-variants'
import A2MenuList from '~/components/A2MenuList.vue'
import type { A2MenuItem } from '~/components/a2-menu-item'

//const value = defineModel<T>()
const props = withDefaults(
  defineProps<{
    label: string
    size: 'm' | 'l'
    items?: A2MenuItem[]
  }>(),
  {
    size: 'm',
    items: undefined,
  },
)

const expanded = ref(false)

const safeMenuItems = computed(() => props.items ?? [])

const menuIndicatorClass = computed(() => [
  'duration-300', //
  'transform',
  expanded.value ? 'rotate-180' : 'rotate-0',
])

const variants = tv({
  base: [
    'flex', //
    'justify-start',
    'items-center',
    'border',
    'border-input-border',
    'bg-input-default',
    'cursor-pointer',
    'gap-2',
  ],
  variants: {
    size: {
      l: ['px-size-l-space-x', 'py-size-l-space-y', 'h-size-l-height', 'rounded-size-l-round rounded-size-l-round'],
      m: ['px-size-m-space-x', 'py-size-m-space-y', 'h-size-m-height', 'rounded-size-m-round rounded-size-m-round'],
    },
  },
})

function handleMenuClick() {
  expanded.value = !expanded.value
}
</script>

<template>
  <div class="flex flex-col gap-0">
    <div :class="variants({ size })" @click="handleMenuClick">
      <p class="flex-1">{{ label }}</p>
      <Icon name="mdi:menu-down" :class="menuIndicatorClass" size="26px" />
    </div>
    <div class="relative">
      <A2MenuList v-model:open="expanded" :items="safeMenuItems" :expand-width="true" />
    </div>
  </div>
</template>
