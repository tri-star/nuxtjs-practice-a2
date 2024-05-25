<script setup lang="ts">
import AdminUserCreatePage from '~/features/admin-users/pages/create/AdminUserCreatePage.vue'
import { DEFAULT_LAYOUT_MENU_ID_MAP } from '~/layouts/parts/default/use-default-layout'

definePageMeta({
  defaultLayoutOption: {
    pageTitle: '管理者ユーザー新規登録',
    activeMenu: DEFAULT_LAYOUT_MENU_ID_MAP.adminUsers,
  },
})
</script>

<template>
  <AdminUserCreatePage />
</template>
