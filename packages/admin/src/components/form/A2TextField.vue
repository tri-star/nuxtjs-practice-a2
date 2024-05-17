<script setup lang="ts">
import { tv } from 'tailwind-variants'
import type { MdiIconString } from '~/types/mdi-icons'

const value = defineModel<string>()
withDefaults(
  defineProps<{
    size: 'm' | 'l'
    leadingIcon?: MdiIconString
  }>(),
  {
    size: 'm',
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
  <div>
    <div class="flex items-center justify-center absolute inset-y-0 start-0 p-2">
      <MdiIcon v-if="leadingIcon" :icon="leadingIcon" class="block text-on-input-placeholder" style="width: 36px" />
    </div>
    <input v-model="value" type="text" :class="variants({ size, withLeading: !!leadingIcon })" >
  </div>
</template>
