<script setup lang="ts">
import { tv } from 'tailwind-variants'

type ColorVariant = 'primary' | 'primaryLoading' | 'button'

const props = withDefaults(
  defineProps<{
    title?: string
    color?: ColorVariant
    isLoading?: boolean
    icon?: string
    size?: 'xs' | 's' | 'm' | 'l'
  }>(),
  {
    title: undefined,
    color: 'primary',
    isLoading: false,
    icon: undefined,
    size: 'l',
  },
)

const emit = defineEmits<{
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
      primaryLoading: [
        'bg-accent-primary-active',
        'border-button-active',
        'text-on-accent-primary-hover',
        'shadow-none',
        'translate-y-0',
        'cursor-progress',
      ],
      button: [
        'bg-button-default',
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

const iconVariant = tv({
  base: [],
  variants: {
    color: {
      primary: [
        'text-on-accent-primary-default', //
        'hover:text-on-accent-primary-hover',
      ],
      primaryLoading: ['text-on-accent-primary-hover'],
      button: [
        'border-button-border',
        'text-on-button-default', //
      ],
    },
  },
})

const colorVarinat = computed(() => {
  if (props.color === 'primary') {
    return props.isLoading ? 'primaryLoading' : 'primary'
  }
  return props.color
})

function handleClick() {
  if (props.isLoading) {
    return
  }
  emit('click')
}
</script>

<template>
  <button :class="variants({ color: colorVarinat, size: size })" @click="handleClick">
    <Icon v-if="icon" :name="icon" size="20px" :class="iconVariant({ color: colorVarinat })" />
    <span v-if="title">{{ title }}</span>
  </button>
</template>
