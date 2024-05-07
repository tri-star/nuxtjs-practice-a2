<script setup lang="ts">
import { tv } from 'tailwind-variants'

defineProps<{
  type: 'success' | 'error'
  message: string
}>()

const variants = tv({
  base: [
    'flex',
    'px-size-l-space-x',
    'py-size-l-space-y',
    'justify-center',
    'items-center',
    'rounded-md',
    'gap-size-l-gap',
    'transition-all',
    'duration-300',
  ],
  variants: {
    type: {
      success: ['bg-success-default', 'text-on-success-default'],
      error: ['bg-error-default', 'text-on-error-default'],
    },
  },
})
</script>

<template>
  <div class="transition-all" :class="variants({ type })">{{ message }}</div>
</template>
