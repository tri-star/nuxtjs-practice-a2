<script setup lang="ts">
import A2Button from '~/components/A2Button.vue'
import A2FormField from '~/components/form/A2FormField.vue'
import A2FormLabel from '~/components/form/A2FormLabel.vue'
import A2FormRow from '~/components/form/A2FormRow.vue'
import { fetchAdminUser } from '~/features/admin-users/api/fetch-admin-user'

const router = useRouter()
const route = useRoute()

const adminUserId = `${route.params.id}`
const { adminUser, adminUserError, isAdminUserPending } = fetchAdminUser(adminUserId)

function handleEditClick() {}

function handleCancelClick() {
  router.back()
}
</script>

<template>
  <div class="flex w-6/12 self-center">
    <div class="grid grid-cols-12 w-full">
      <template v-if="adminUserError">
        <A2FormRow class="grid col-span-12">
          <p>ユーザー情報の取得中にエラーが発生しました</p>
        </A2FormRow>
      </template>
      <template v-else>
        <A2FormRow class="grid col-span-12 grid-cols-subgrid">
          <template #label>
            <A2FormLabel class="col-span-2">氏名</A2FormLabel>
          </template>
          <template #field>
            <A2FormField class="col-span-8">
              <div class="flex h-size-l-height items-center">
                <template v-if="isAdminUserPending">-</template>
                <template v-else-if="adminUser">
                  <p>{{ adminUser.name }}</p>
                </template>
              </div>
            </A2FormField>
          </template>
        </A2FormRow>
        <A2FormRow class="grid col-span-12 grid-cols-subgrid">
          <template #label>
            <A2FormLabel class="col-span-2">ログインID</A2FormLabel>
          </template>
          <template #field>
            <A2FormField class="col-span-8">
              <div class="flex h-size-l-height items-center">
                <template v-if="isAdminUserPending">-</template>
                <template v-else-if="adminUser">
                  <p>{{ adminUser.loginId }}</p>
                </template>
              </div>
            </A2FormField>
          </template>
        </A2FormRow>
      </template>
      <div class="flex col-span-12 justify-center gap-2 my-4">
        <A2Button color="button" title="編集" icon="mdi:pencil" size="m" @click="handleEditClick" />
        <A2Button color="button" title="キャンセル" icon="mdi:backspace" size="m" @click="handleCancelClick" />
      </div>
    </div>
  </div>
</template>
