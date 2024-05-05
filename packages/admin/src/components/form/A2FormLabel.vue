<script setup lang="ts">
defineSlots<{
  default: () => unknown
}>()
</script>

<template>
  <div class="flex item-start gap-2 p-2">
    <div class="flex h-size-l-height justify-center items-center"><slot name="default"></slot></div>
  </div>
</template>
