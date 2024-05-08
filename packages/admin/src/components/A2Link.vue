<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  text: string
  to: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink :to="to" class="border-b border-link text-link">{{ text }}</RouterLink>
</template>
