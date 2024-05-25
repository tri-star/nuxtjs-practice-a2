<script setup lang="ts">
import { tv } from 'tailwind-variants'

const modelValue = defineModel<string>()
withDefaults(
  defineProps<{
    size: 'm' | 'l'
    type?: string
    leadingIcon?: string
    state?: 'default' | 'error'
    name?: string
    value?: string
  }>(),
  {
    size: 'm',
    type: 'text',
    leadingIcon: undefined,
    state: 'default',
    name: undefined,
    value: undefined,
  },
)

const emit = defineEmits<{
  input: [e: Event]
  blur: [e: Event]
}>()

const variants = tv({
  base: ['flex', 'items-center', 'border', 'border-input-border', 'bg-input-default', 'w-full'],
  variants: {
    state: {
      default: [],
      error: ['border-error-border', 'bg-error-default', 'text-error-on-default'],
    },
    size: {
      l: ['px-size-l-space-x', 'py-size-l-space-y', 'h-size-l-height', 'rounded-size-l-round rounded-size-l-round'],
      m: ['px-size-m-space-x', 'py-size-m-space-y', 'h-size-m-height', 'rounded-size-m-round rounded-size-m-round'],
    },
    withLeading: {
      true: ['pl-[40px]'],
      false: [],
    },
  },
})
</script>

<template>
  <div class="relative">
    <div v-if="leadingIcon" class="flex items-center justify-center absolute inset-y-0 start-0 p-2">
      <Icon :name="leadingIcon" size="26px" class="text-on-input-placeholder" />
    </div>
    <input
      v-if="modelValue !== undefined"
      v-model="modelValue"
      :type="type"
      :class="variants({ size, state, withLeading: !!leadingIcon })"
    />
    <input
      v-else
      :type="type"
      :value="value"
      class="bg-error-default"
      :class="variants({ size, state, withLeading: !!leadingIcon })"
      @blur="($event: Event) => emit('blur', $event)"
      @input="($event: Event) => emit('input', $event)"
    />
  </div>
</template>
