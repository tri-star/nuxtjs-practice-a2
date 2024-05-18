<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  item: {
    title: string
    icon: string
    to?: RouteLocationRaw
  }
}>()

const classNames = [
  'flex',
  'w-full',
  'h-14',
  'px-side-menu-space-x',
  'py-side-menu-space-y',
  'items-center',
  'gap-side-menu-gap',
  'bg-side-menu-background',
  'text-side-menu-on-default',
  'rounded-md',
  'hover:bg-side-menu-hover',
  'hover:text-side-menu-on-hover',
  'cursor-pointer',
  'transition-colors',
  'duration-300',
  'ease-out',
]
</script>

<template>
  <NuxtLink :class="classNames" :to="item.to">
    <Icon :name="item.icon" size="40px" />
    <span class="text-xl">{{ item.title }}</span>
  </NuxtLink>
</template>
