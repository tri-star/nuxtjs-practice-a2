<script setup lang="ts">
import AdminUserDetailPage from '~/features/admin-users/pages/detail/AdminUserDetailPage.vue'
import { DEFAULT_LAYOUT_MENU_ID_MAP } from '~/layouts/parts/default/use-default-layout'

definePageMeta({
  defaultLayoutOption: {
    pageTitle: '管理者ユーザー詳細',
    activeMenu: DEFAULT_LAYOUT_MENU_ID_MAP.adminUsers,
  },
})
</script>

<template>
  <AdminUserDetailPage />
</template>
