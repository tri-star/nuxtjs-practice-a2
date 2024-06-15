<script setup lang="ts">
import A2Button from '~/components/A2Button.vue'
import A2FormField from '~/components/form/A2FormField.vue'
import A2FormLabel from '~/components/form/A2FormLabel.vue'
import A2FormRow from '~/components/form/A2FormRow.vue'
import A2TextField from '~/components/form/A2TextField.vue'
import { useForm } from '@tanstack/vue-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import {
  createAdminUserValidationSchema,
  type CreateAdminUserValidation,
} from '~/features/admin-users/domain/admin-user'
import { z } from 'zod'
import { createAdminUser } from '~/features/admin-users/api/create-admin-user'
import { validateAdminUserLoginId } from '~/features/auth/clients/validate-admin-user-login-id'

const router = useRouter()
const { createToast } = useToastStore()
const loginIdValidationStatus = ref<'pending' | 'ok' | 'error' | undefined>(undefined)

const form = useForm({
  defaultValues: {
    name: '',
    loginId: '',
    password: '',
  } satisfies CreateAdminUserValidation,
  validatorAdapter: zodValidator,
  onSubmit: async (formData) => {
    try {
      await createAdminUser(formData.value)
      createToast({
        message: '登録が完了しました',
        type: 'success',
      })
      router.back()
    } catch (e) {
      createToast({
        message: '登録処理の実行中にエラーが発生しました。\nお手数ですが、時間を空けて再度お試しください。',
        type: 'error',
      })
    }
  },
})

function handleCancelClick() {
  router.back()
}

async function validateLoginId(loginId: string) {
  loginIdValidationStatus.value = 'pending'
  const result = await validateAdminUserLoginId(loginId)
  if (result.isErr()) {
    return false
  }

  if (!result.value) {
    loginIdValidationStatus.value = 'error'
    return false
  }

  loginIdValidationStatus.value = 'ok'
  return true
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
            <form.Field
              name="name"
              :validators="{
                onChange: createAdminUserValidationSchema.shape.name,
              }"
            >
              <template #default="{ field }">
                <div>
                  <A2TextField
                    size="l"
                    class="w-full"
                    :state="field.state.meta.errors.length ? 'error' : 'default'"
                    :name="field.name"
                    :value="field.state.value"
                    @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
                  />
                  <ul v-if="field.state.meta.errors.length">
                    <li v-for="error in field.state.meta.errors" :key="error?.toString()" class="text-on-error-default">
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </template>
            </form.Field>
          </A2FormField>
        </template>
      </A2FormRow>
      <A2FormRow class="grid col-span-12 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">ログインID</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-8">
            <form.Field
              name="loginId"
              :validators="{
                onChange: createAdminUserValidationSchema.shape.loginId,
                onChangeAsync: z.string().refine(validateLoginId, 'このログインIDは利用できません'),
              }"
            >
              <template #default="{ field }">
                <div>
                  <A2TextField
                    size="l"
                    class="w-full"
                    :state="field.state.meta.errors.length ? 'error' : 'default'"
                    :value="field.state.value"
                    @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
                  />
                  <ul v-if="field.state.meta.errors.length">
                    <li v-for="error in field.state.meta.errors" :key="error?.toString()" class="text-on-error-default">
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </template>
            </form.Field>
          </A2FormField>
          <div class="flex col-span-1 justify-center items-center h-full">
            <!-- TODO: ローディング中の色 -->
            <Icon
              v-if="loginIdValidationStatus === 'pending'"
              name="mdi:loading"
              size="40"
              class="animate-spin text-on-success-default"
            />
            <Icon v-if="loginIdValidationStatus === 'ok'" name="mdi:check" size="40" class="text-on-success-hover" />
            <Icon v-if="loginIdValidationStatus === 'error'" name="mdi:close" size="40" class="text-on-error-hover" />
          </div>
        </template>
      </A2FormRow>
      <A2FormRow class="grid col-span-12 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">パスワード</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-8">
            <form.Field
              name="password"
              :validators="{
                onChange: createAdminUserValidationSchema.shape.password,
              }"
            >
              <template #default="{ field }">
                <A2TextField
                  size="l"
                  class="w-full"
                  type="password"
                  autocomplete="new-password"
                  :state="field.state.meta.errors.length ? 'error' : 'default'"
                  :value="field.state.value"
                  @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
                />
                <ul v-if="field.state.meta.errors.length">
                  <li v-for="error in field.state.meta.errors" :key="error?.toString()" class="text-on-error-default">
                    {{ error }}
                  </li>
                </ul>
              </template>
            </form.Field>
          </A2FormField>
        </template>
      </A2FormRow>
      <div class="flex col-span-12 justify-center gap-2 my-4">
        <form.Subscribe>
          <template #default="{ canSubmit, isSubmitting }">
            <A2Button
              :color="isSubmitting ? 'primaryLoading' : 'primary'"
              title="登録"
              icon="mdi:content-save"
              size="m"
              :disabled="!canSubmit"
              @click="form.handleSubmit"
            />
          </template>
        </form.Subscribe>
        <A2Button color="button" title="キャンセル" icon="mdi:backspace" size="m" @click="handleCancelClick" />
      </div>
    </div>
  </div>
</template>
