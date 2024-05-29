<script setup lang="ts">
import A2Toast from '~/components/A2Toast.vue'
import A2TextField from '~/components/form/A2TextField.vue'
import AccountMenuIcon from '~/layouts/parts/default/AccountMenuIcon.vue'
import SideMenu from '~/layouts/parts/default/SideMenu.vue'
import { useDefaultLayoutStore } from '~/layouts/parts/default/use-default-layout'

const defaultLayoutStore = useDefaultLayoutStore()
const { pageTitle } = storeToRefs(defaultLayoutStore)
const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
</script>

<template>
  <!-- TODO: 背景色の変数化 -->
  <div class="flex w-full h-full items-start bg-outlined-disabled overflow-hidden">
    <SideMenu />
    <div class="flex flex-col w-full h-full overflow-y-auto">
      <!-- TODO: z-indexをセマンティックに定義 -->
      <header
        class="sticky top-0 z-10 flex w-full px-header-space-x py-header-space-y gap-header-gap items-center bg-header-background backdrop-blur-md"
      >
        <A2TextField size="m" :leading-icon="'mdi:search-web'" />
        <div class="flex-1" />
        <AccountMenuIcon />
      </header>
      <div class="flex items-start flex-1 w-full h-full">
        <main class="flex p-2 flex-col items-start gap-5 flex-1 w-full h-full">
          <h1 v-if="pageTitle" class="text-4xl font-bold mt-3">{{ pageTitle }}</h1>

          <div class="flex flex-col flex-1 items-start p-2 gap-2 w-full object-contain bg-default">
            <slot />
            <div>
              <A2Toast
                v-for="toast in toasts"
                :id="toast.id"
                :key="toast.id"
                :type="toast.type"
                :duration="toast.durationMs"
                :message="toast.message"
                :bottom-y="toast.bottomY"
                @destroy="toastStore.handleDestroyToast"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
