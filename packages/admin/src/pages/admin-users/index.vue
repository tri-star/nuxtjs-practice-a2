<script setup lang="ts">
import AdminUserListPage from '~/features/admin-users/pages/AdminUserListPage.vue'
import { DEFAULT_LAYOUT_MENU_ID_MAP } from '~/layouts/parts/default/use-default-layout'

definePageMeta({
  defaultLayoutOption: {
    pageTitle: '管理者ユーザー一覧',
    activeMenu: DEFAULT_LAYOUT_MENU_ID_MAP.adminUsers,
  },
})
</script>

<template>
  <AdminUserListPage />
</template>
