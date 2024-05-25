<script setup lang="ts">
defineSlots<{
  default: () => unknown
}>()
</script>

<template>
  <div class="flex flex-col item-start gap-2 p-2">
    <slot name="default"></slot>
  </div>
</template>
