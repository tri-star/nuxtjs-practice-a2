<script setup lang="ts">
import A2Button from '~/components/A2Button.vue'

const router = useRouter()

function handleClickBack() {
  router.back()
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-center items-center w-full h-48 text-6xl text-on-input-placeholder">
      <p class="text-center">ユーザー情報の取得中にエラーが発生しました</p>
    </div>
    <div class="flex justify-center gap-2 my-4">
      <A2Button color="button" title="戻る" icon="mdi:backspace" size="m" @click="handleClickBack" />
    </div>
  </div>
</template>
