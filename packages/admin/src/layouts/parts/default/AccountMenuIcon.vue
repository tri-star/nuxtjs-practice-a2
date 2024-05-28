<script setup lang="ts">
import A2MenuList from '~/components/A2MenuList.vue'
import type { A2MenuItem } from '~/components/a2-menu-item'

const toggleMenu = ref(false)

const items: A2MenuItem[] = [
  {
    id: 'user-setting',
    label: 'ユーザー情報',
  },
  {
    id: 'setting',
    label: '設定',
  },
]

function handleIconClick() {
  toggleMenu.value = !toggleMenu.value
}
</script>

<template>
  <div class="relative">
    <Icon name="mdi:account-circle" size="40px" class="block cursor-pointer" @click="handleIconClick" />
    <A2MenuList v-model:open="toggleMenu" :items="items" />
  </div>
</template>
