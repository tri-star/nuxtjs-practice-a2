<script setup lang="ts">
import A2Button from '~/components/A2Button.vue'
import A2FormField from '~/components/form/A2FormField.vue'
import A2FormLabel from '~/components/form/A2FormLabel.vue'
import A2FormRow from '~/components/form/A2FormRow.vue'
import { fetchAdminUserAsync } from '~/features/admin-users/api/fetch-admin-user'
import ErrorSection from '~/features/admin-users/pages/detail/parts/ErrorSection.vue'

const router = useRouter()
const route = useRoute()

const adminUserId = `${route.params.id}`
const fetchedAdminUser = await fetchAdminUserAsync(adminUserId)

const adminUser = computed(() => {
  return fetchedAdminUser.unwrapOr(null)
})

const adminUserError = computed(() => {
  return fetchedAdminUser.isErr() ? true : null
})

function handleEditClick() {
  router.push({ path: `/admin-users/${adminUserId}/edit` })
}

function handleCancelClick() {
  router.back()
}
</script>

<template>
  <div class="flex w-6/12 self-center">
    <ErrorSection v-if="adminUserError != null" />
    <div v-else-if="adminUser" class="grid grid-cols-12 w-full">
      <A2FormRow class="grid col-span-12 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">氏名</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-8">
            <div class="flex h-size-l-height items-center">
              <p>{{ adminUser.name }}</p>
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
              <p>{{ adminUser.loginId }}</p>
            </div>
          </A2FormField>
        </template>
      </A2FormRow>
      <div class="flex col-span-12 justify-center gap-2 my-4">
        <A2Button color="button" title="編集" icon="mdi:pencil" size="m" @click="handleEditClick" />
        <A2Button color="button" title="キャンセル" icon="mdi:backspace" size="m" @click="handleCancelClick" />
      </div>
    </div>
  </div>
</template>
