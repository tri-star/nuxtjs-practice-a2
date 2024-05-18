<script setup lang="ts">
import A2TextField from '~/components/form/A2TextField.vue'
import SideMenu from '~/layouts/parts/default/SideMenu.vue'
</script>

<template>
  <!-- TODO: 背景色の変数化 -->
  <div class="flex flex-col w-full h-full items-start bg-outlined-disabled">
    <div class="flex w-full px-header-space-x py-header-space-y gap-header-gap bg-header-background backdrop-blur-md">
      <Icon name="mdi:menu" size="44px" />
      <A2TextField size="l" :leading-icon="'mdi:search-web'" />
    </div>
    <div class="flex items-start flex-1">
      <SideMenu :expanded="true" />
      <div class="flex p-2 flex-col items-start gap-5 flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
