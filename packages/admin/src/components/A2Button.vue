<script setup lang="ts">
import { tv } from 'tailwind-variants'

defineProps<{
  title: string
}>()

defineEmits<{
  click: []
}>()

const variants = tv({
  base: [
    'flex',
    'justify-center',
    'items-center',
    'shadow-md',
    'active:shadow-none',
    '-translate-y-1',
    'active:translate-y-0',
    'transition',
    'duration-300',
    'ease-out',
  ],
  variants: {
    color: {
      primary: [
        'bg-accent-primary-default',
        'hover:bg-accent-primary-hover',
        'border-button-border',
        'text-on-accent-primary-default',
        'hover:text-on-accent-primary-hover',
      ],
      button: [
        'bg-accent-button-default',
        'hover:bg-button-hover',
        'border-button-border',
        'text-on-button-default', //
      ],
    },
    size: {
      xs: ['h-size-xs-height', 'px-size-xs-space-x', 'py-size-xs-space-y', 'gap-size-xs-gap', 'rounded-size-xs-round'],
      s: ['h-size-s-height', 'px-size-s-space-x', 'py-size-s-space-y', 'gap-size-s-gap', 'rounded-size-s-round'],
      m: ['h-size-m-height', 'px-size-m-space-x', 'py-size-m-space-y', 'gap-size-m-gap', 'rounded-size-m-round'],
      l: ['h-size-l-height', 'px-size-l-space-x', 'py-size-l-space-y', 'gap-size-l-gap', 'rounded-size-l-round'],
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'l',
  },
})
</script>

<template>
  <button :class="variants({ color: 'primary', size: 'l' })" @click="$emit('click')">
    {{ title }}
  </button>
</template>
