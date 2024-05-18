<script setup lang="ts">
import { tv } from 'tailwind-variants'

const value = defineModel<string>()
withDefaults(
  defineProps<{
    size: 'm' | 'l'
    type?: string
    leadingIcon?: string
  }>(),
  {
    size: 'm',
    type: 'text',
    leadingIcon: undefined,
  },
)

const variants = tv({
  base: ['flex', 'items-center', 'border', 'border-input-border', 'bg-input-default'],
  variants: {
    size: {
      l: ['px-size-l-space-x', 'py-size-l-space-y', 'h-size-l-height', 'rounded-size-l-round rounded-size-l-round'],
      m: ['px-size-m-space-x', 'py-size-m-space-y', 'h-size-m-height', 'rounded-size-m-round rounded-size-m-round'],
    },
    withLeading: {
      true: ['pl-[48px]'],
      false: [],
    },
  },
})
</script>

<template>
  <div class="relative">
    <div v-if="leadingIcon" class="flex items-center justify-center absolute inset-y-0 start-0 p-2">
      <Icon :name="leadingIcon" size="36px" class="text-on-input-placeholder" />
    </div>
    <input v-model="value" :type="type" :class="variants({ size, withLeading: !!leadingIcon })" />
  </div>
</template>
