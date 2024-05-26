<script setup lang="ts">
import A2Toast from '~/components/A2Toast.vue'
import A2TextField from '~/components/form/A2TextField.vue'
import SideMenu from '~/layouts/parts/default/SideMenu.vue'
import { useDefaultLayoutStore } from '~/layouts/parts/default/use-default-layout'

const defaultLayoutStore = useDefaultLayoutStore()
const { toggleMenu } = defaultLayoutStore
const { pageTitle } = storeToRefs(defaultLayoutStore)
const { toasts, handleDestroyToast } = useToast()

function handleToggleMenuClick() {
  toggleMenu()
}
</script>

<template>
  <!-- TODO: 背景色の変数化 -->
  <div class="relative flex flex-col w-full h-full items-start bg-outlined-disabled">
    <div
      class="flex w-full px-header-space-x py-header-space-y gap-header-gap items-center bg-header-background backdrop-blur-md"
    >
      <Icon name="mdi:menu" size="40px" class="cursor-pointer" @click="handleToggleMenuClick" />
      <A2TextField size="m" :leading-icon="'mdi:search-web'" />
    </div>
    <div class="flex items-start flex-1 w-full h-full">
      <SideMenu />
      <main class="flex p-2 flex-col items-start gap-5 flex-1 w-full h-full">
        <h1 v-if="pageTitle" class="text-4xl font-bold mt-3">{{ pageTitle }}</h1>

        <div class="flex flex-col flex-1 items-start p-2 gap-2 w-full h-full bg-default">
          <slot />
        </div>
      </main>
    </div>
    <div id="toast" />
    <A2Toast message="aaaaa" />
  </div>
</template>
