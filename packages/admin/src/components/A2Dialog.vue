<script setup lang="ts">
import A2Button from '~/components/A2Button.vue'
import type { DialogOptionWithId } from '~/composables/use-dialog'

const props = defineProps<{
  option: DialogOptionWithId
}>()

const emit = defineEmits<{
  close: [id: string]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const isOpen = defineModel<boolean>('isOpen')

onMounted(() => {
  if (dialogRef.value == null) {
    return
  }

  dialogRef.value.addEventListener('close', () => {
    isOpen.value = false
    emit('close', props.option.id)
  })
})

watch(
  isOpen,
  (newValue) => {
    nextTick(() => {
      if (!newValue) {
        dialogRef.value?.close()
        emit('close', props.option.id)
      } else {
        dialogRef.value?.showModal()
      }
    })
  },
  {
    immediate: true,
  },
)

function handleClick() {
  isOpen.value = false
}
</script>

<template>
  <dialog ref="dialogRef" class="backdrop-blur-md p-2">
    <div class="bg-menu-default flex flex-col gap-2">
      <!-- TODO: 変数が必要。テーブルヘッダと同じ -->
      <header class="bg-menu-hover p-2">{{ option.title }}</header>
      <main class="p-2">{{ option.message }}</main>
      <footer class="flex justify-center p-2">
        <A2Button icon="mdi:close" size="m" :title="option.closeText" @click="handleClick" />
      </footer>
    </div>
  </dialog>
</template>
