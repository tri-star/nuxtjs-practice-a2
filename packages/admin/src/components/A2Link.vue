<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <RouterLink :to="'/admin/register'" class="border-b border-link text-link">{{ text }}</RouterLink>
</template>
