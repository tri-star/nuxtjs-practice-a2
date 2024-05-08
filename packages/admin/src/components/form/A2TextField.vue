<script setup lang="ts">
import { tv } from 'tailwind-variants'

const value = defineModel<string>()
withDefaults(
  defineProps<{
    size: 'm' | 'l'
  }>(),
  {
    size: 'm',
  },
)

const variants = tv({
  base: ['flex', 'items-center', 'border', 'border-input-border', 'bg-input-default'],
  variants: {
    size: {
      l: ['px-size-l-space-x', 'py-size-l-space-y', 'h-size-l-height', 'rounded-size-l-round'],
      m: ['px-size-m-space-x', 'py-size-m-space-y', 'h-size-m-height', 'rounded-size-m-round'],
    },
  },
})
</script>

<template>
  <input v-model="value" type="text" :class="variants({ size })" />
</template>
