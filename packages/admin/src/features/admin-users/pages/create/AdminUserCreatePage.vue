<script setup lang="ts">
import A2Button from '~/components/A2Button.vue'
import A2FormField from '~/components/form/A2FormField.vue'
import A2FormLabel from '~/components/form/A2FormLabel.vue'
import A2FormRow from '~/components/form/A2FormRow.vue'
import A2TextField from '~/components/form/A2TextField.vue'

const router = useRouter()

function handleCancelClick() {
  router.back()
}
</script>

<template>
  <div class="flex w-6/12 self-center">
    <div class="grid grid-cols-12 w-full">
      <A2FormRow class="grid col-span-12 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">氏名</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-8">
            <A2TextField size="l" class="w-full" />
          </A2FormField>
        </template>
      </A2FormRow>
      <A2FormRow class="grid col-span-12 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">ログインID</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-8">
            <A2TextField size="l" class="w-full" />
          </A2FormField>
          <div class="flex col-span-1 justify-center items-center h-full">
            <Icon name="mdi:loading" size="40" />
          </div>
        </template>
      </A2FormRow>
      <A2FormRow class="grid col-span-12 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">パスワード</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-8">
            <A2TextField size="l" class="w-full" type="password" autocomplete="new-password" />
          </A2FormField>
        </template>
      </A2FormRow>
      <div class="flex col-span-12 justify-center gap-2 my-4">
        <A2Button color="primary" title="登録" icon="mdi:content-save" size="m" />
        <A2Button color="button" title="キャンセル" icon="mdi:backspace" size="m" @click="handleCancelClick" />
      </div>
    </div>
  </div>
</template>
