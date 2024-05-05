<script setup lang="ts">
import A2FormRow from '~/components/form/A2FormRow.vue'
import A2TextField from '~/components/form/A2TextField.vue'
import A2FormLabel from '~/components/form/A2FormLabel.vue'
import A2FormField from '~/components/form/A2FormField.vue'
import A2Button from '~/components/A2Button.vue'

const loginId = ref('')
const password = ref('')
</script>

<template>
  <div class="w-full h-full bg-login-background bg-cover grid grid-cols-12 justify-center items-center">
    <div
      class="grid grid-cols-12 col-span-6 col-start-4 p-6 justify-center items-center gap-size-m-gap border border-menu-border rounded-md bg-menu-default backdrop-blur-md"
    >
      <A2FormRow class="grid col-start-3 col-span-8 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">Login ID</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-6">
            <A2TextField v-model="loginId" />
          </A2FormField>
        </template>
      </A2FormRow>
      <A2FormRow class="grid col-start-3 col-span-8 grid-cols-subgrid">
        <template #label>
          <A2FormLabel class="col-span-2">Password</A2FormLabel>
        </template>
        <template #field>
          <A2FormField class="col-span-6">
            <A2TextField v-model="password" />
          </A2FormField>
        </template>
      </A2FormRow>
      <div class="grid col-span-12 grid-cols-subgrid my-4">
        <A2Button title="LOGIN" class="col-start-5 col-span-4" />
      </div>
    </div>
  </div>
</template>
