<script setup lang="ts">
import A2CheckBox from '~/components/form/A2CheckBox.vue'
import { fetchAdminUserList } from '~/features/admin-users/api/fetch-admin-user-list'
import {
  adminUserListResponseSchema,
  transformToAdminUserListEntry,
} from '~/features/admin-users/domain/admin-user-list-entry'
import { toAppError } from '~/lib/error/app-error'

const { rawAdminUserList, rawAdminUserListError, isAdminUserListPending } = fetchAdminUserList()

const idList = ref<string[]>([])

const adminUserList = computed(() => {
  if (rawAdminUserList.value == null) {
    return []
  }

  const responseJson = adminUserListResponseSchema.parse(rawAdminUserList.value)
  return responseJson.data.map((adminUserJson) => {
    return transformToAdminUserListEntry(adminUserJson)
  })
})

const adminUserListError = computed(() => {
  if (rawAdminUserListError.value == null) {
    return null
  }

  return toAppError(rawAdminUserListError.value)
})
</script>

<template>
  <div class="flex flex-col flex-1 items-start p-2 gap-2 w-full h-full bg-default">
    <table class="table-fixed w-full">
      <colgroup>
        <col class="w-12 p-2" />
        <col class="w-80 p-2" />
        <col class="w-40" />
        <col class="" />
      </colgroup>
      <thead>
        <!-- TODO: テーブルヘッダの色を変数化 -->
        <tr class="h-11" style="background-color: #e0f2fe">
          <th class="font-bold flex justify-center items-center h-11"><A2CheckBox value="1" /></th>
          <th class="font-bold text-left">ID</th>
          <th class="font-bold text-left">名前</th>
          <th class="font-bold text-left">ログインID</th>
        </tr>
      </thead>
      <tbody v-if="isAdminUserListPending">
        <tr>
          <td
            colspan="4"
            class="p-48 text-center align-middle text-on-input-placeholder text-8xl font-bold animate-pulse"
          >
            LOADING...
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="adminUserListError">
        <tr>
          <td colspan="4" class="p-48 text-center align-middle text-on-input-placeholder text-8xl font-bold">ERROR</td>
        </tr>
      </tbody>
      <tbody v-else-if="adminUserList.length === 0">
        <tr>
          <td colspan="4" class="p-48 text-center align-middle text-on-input-placeholder text-8xl font-bold">
            NO DATA
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <!-- TODO: テーブルのボーダーの色  -->
        <tr v-for="user in adminUserList" :key="user.id" class="h-11 border-b border-button-border">
          <td class="flex justify-center items-center h-11"><A2CheckBox v-model="idList" :value="user.id" /></td>
          <td class="text-left">{{ user.id }}</td>
          <td class="text-left">{{ user.name }}</td>
          <td class="text-left">{{ user.loginId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>