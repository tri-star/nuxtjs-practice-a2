<script setup lang="ts">
import A2TextField from '~/components/form/A2TextField.vue'
</script>

<template>
  <div class="flex flex-col w-full h-full items-start gap-2">
    <div class="flex px-header-space-x py-header-space-y gap-header-gap bg-header-background backdrop-blur-md">
      <MdiIcon icon="mdiMenu" style="width: 44px" />
      <A2TextField size="l" />
    </div>

    <slot />
  </div>
</template>
