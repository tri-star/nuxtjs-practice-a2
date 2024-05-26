<script setup lang="ts">
import { tv } from 'tailwind-variants'

withDefaults(
  defineProps<{
    id: string
    type?: 'success' | 'error'
    message: string
    duration?: number
  }>(),
  {
    type: 'success',
    duration: 300,
  },
)

const emit = defineEmits<{
  destroy: [id: string]
}>()

const toastRef = ref<HTMLElement | null>(null)

const variant = tv({
  base: [
    'block',
    'w-6/12',
    'justify-center',
    'items-center',
    'rounded-md',
    'drop-shadow-md',
    'h-10',
    'px-size-l-space-x',
    'py-size-l-space-y',
    'absolute',
    'bottom-8',
    'duration-300',
    'transform',
    'ease-in-out',
  ],
  variants: {
    type: {
      success: ['bg-success-default', 'border-success-border', 'text-on-success-default'],
      error: ['bg-error-default', 'border-error-border', 'text-on-error-default'],
    },
  },
})

const positionClassNames = ref<string[]>(['translate-y-32', 'opacity-100'])

onMounted(() => {
  nextTick(() => {
    if (toastRef.value == null) {
      return
    }
    positionClassNames.value = ['translate-y-0', 'opacity-100']

    const windowWidth = window.innerWidth
    const toastWidth = toastRef.value.clientWidth
    toastRef.value.style.left = `${(windowWidth - toastWidth) / 2}px`
  })
})
</script>

<template>
  <div ref="toastRef" :class="[variant({ type: 'success' }), ...positionClassNames]">{{ message }}</div>
</template>
