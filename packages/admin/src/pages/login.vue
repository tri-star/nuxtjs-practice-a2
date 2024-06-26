<script setup lang="ts">
import A2FormRow from '~/components/form/A2FormRow.vue'
import A2TextField from '~/components/form/A2TextField.vue'
import A2FormLabel from '~/components/form/A2FormLabel.vue'
import A2FormField from '~/components/form/A2FormField.vue'
import A2Button from '~/components/A2Button.vue'
import { useAuthStore } from '~/features/auth/composables/use-auth'
import A2TextMessage from '~/components/A2TextMessage.vue'
import A2Link from '~/components/A2Link.vue'
import { UnexpectedError, toAppError, ERROR_TYPE_MAP } from '~/lib/error/app-error'
import { isOneOf } from '~/lib/utils/array'

const router = useRouter()
const authStore = useAuthStore()

const loginId = ref('')
const password = ref('')
const pending = ref(false)
const error = ref('')

definePageMeta({
  layout: 'pre-login',
})

async function handleLoginClick() {
  try {
    pending.value = true
    error.value = ''

    await authStore.login(loginId.value, password.value)
    if (await authStore.isLoggedIn()) {
      await router.push({ name: 'index' })
    }
  } catch (e: unknown) {
    const appError = toAppError(e)
    if (appError instanceof UnexpectedError) {
      if (isOneOf(appError.errorType, [ERROR_TYPE_MAP.UNAUTHORIZED, ERROR_TYPE_MAP.BAD_REQUEST])) {
        error.value = 'Login ID、またはパスワードが不正です。'
        return
      }
    }
    error.value = 'サーバーのエラーによりログインに失敗しました。お手数ですが、しばらく時間を空けて再度お試しください。'
    throw e
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div
    class="grid grid-cols-12 col-span-6 col-start-4 p-6 justify-center items-center gap-size-m-gap border border-menu-border rounded-md bg-menu-default backdrop-blur-md"
  >
    <A2FormRow class="grid col-start-3 col-span-8 grid-cols-subgrid">
      <template #label>
        <A2FormLabel class="col-span-2">Login ID</A2FormLabel>
      </template>
      <template #field>
        <A2FormField class="col-span-6">
          <A2TextField v-model="loginId" size="l" @keydown.enter.prevent="handleLoginClick" />
        </A2FormField>
      </template>
    </A2FormRow>
    <A2FormRow class="grid col-start-3 col-span-8 grid-cols-subgrid">
      <template #label>
        <A2FormLabel class="col-span-2">Password</A2FormLabel>
      </template>
      <template #field>
        <A2FormField class="col-span-6">
          <A2TextField v-model="password" size="l" type="password" @keydown.enter.prevent="handleLoginClick" />
        </A2FormField>
      </template>
    </A2FormRow>
    <div class="grid col-start-5 col-span-4 my-4">
      <A2Button title="LOGIN" color="primary" :is-loading="pending" @click="handleLoginClick" />
    </div>
    <A2TextMessage v-if="error !== ''" :type="'error'" :message="error" class="col-start-2 col-span-10" />
    <div class="grid col-start-5 col-span-4 justify-center">
      <A2Link text="新規登録はこちら" :to="{ path: '/admin/register' }" />
    </div>
  </div>
</template>
