<script setup lang="ts">
import { tv } from 'tailwind-variants'

defineProps<{
  type: 'success' | 'error'
  message: string
}>()

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = false
  // マウント直後はアニメーションが機能しないため1フレーム遅延させる
  // (nextTickでは不可だったためsetTimeoutで対応)
  setTimeout(() => (isVisible.value = true))
})

const variants = tv({
  base: [
    'flex',
    'px-size-l-space-x',
    'py-size-l-space-y',
    'justify-center',
    'items-center',
    'rounded-md',
    'gap-size-l-gap',
    'overflow-hidden',
    'transition-all',
    'duration-900',
    'ease-out',
  ],
  variants: {
    type: {
      success: ['bg-success-default', 'text-on-success-default'],
      error: ['bg-error-default', 'text-on-error-default'],
    },
    visible: {
      true: ['transform', 'scale-y-100', 'max-h-fit'],
      false: ['transform', 'scale-y-0', 'max-h-0'],
    },
  },
})
</script>

<template>
  <div class="transition-all" :class="variants({ type, visible: isVisible })">{{ message }}</div>
</template>
