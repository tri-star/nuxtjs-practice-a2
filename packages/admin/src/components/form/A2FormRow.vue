<script setup lang="ts">
import A2FormField from '~/components/form/A2FormField.vue'
import A2FormLabel from '~/components/form/A2FormLabel.vue'

const props = defineProps<{
  labelText?: string
}>()

defineSlots<{
  label: () => unknown
  field: () => unknown
}>()
</script>

<template>
  <div class="gap-2 items-start">
    <slot name="label">
      <A2FormLabel>{{ props.labelText }}</A2FormLabel>
    </slot>
    <slot name="field">
      <A2FormField />
    </slot>
  </div>
</template>
