<script setup lang="ts">
import { tv } from 'tailwind-variants'
import type { RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    item: {
      title: string
      icon: string
      to?: RouteLocationRaw
    }
    active?: boolean
  }>(),
  {
    active: false,
  },
)

const variant = tv({
  base: [
    'flex',
    'w-full',
    'h-13',
    'overflow-hidden',
    'px-side-menu-space-x',
    'py-side-menu-space-y',
    'items-center',
    'gap-side-menu-gap',
    'bg-side-menu-background',
    'text-side-menu-on-default',
    'active:bg-side-menu-active',
    'rounded-md',
    'cursor-pointer',
    'transition-colors',
    'duration-300',
    'ease-out',
  ],
  variants: {
    active: {
      false: [
        'hover:bg-side-menu-hover', //
        'hover:text-side-menu-on-hover',
      ],
      true: ['bg-side-menu-active'],
    },
  },
})
</script>

<template>
  <NuxtLink :class="variant({ active })" :to="item.to" class="">
    <Icon :name="item.icon" size="36px" class="flex-shrink-0" />
    <span class="block text-l whitespace-nowrap overflow-x-hidden">{{ item.title }}</span>
  </NuxtLink>
</template>
