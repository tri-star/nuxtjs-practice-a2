<script setup lang="ts">
const value = defineModel()
</script>

<template>
  <input
    type="text"
    v-model="value"
    class="flex px-size-l-space-x py-size-l-space-y items-center gap-size-l-gap h-size-l-height border-input-border rounded-size-l-round bg-input-default"
  />
</template>
