<script setup lang="ts">
import A2Button from '~/components/A2Button.vue'
import type { DialogOptionWithId } from '~/composables/use-dialog'

const props = defineProps<{
  option: DialogOptionWithId
}>()

const emit = defineEmits<{
  close: [id: string, selectedValue: string | undefined]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const selectedValue = ref<string | undefined>(undefined)

const isOpen = defineModel<boolean>('isOpen')

onMounted(() => {
  if (dialogRef.value == null) {
    return
  }

  dialogRef.value.addEventListener('close', () => {
    isOpen.value = false
    emit('close', props.option.id, undefined)
  })
})

watch(
  isOpen,
  (newValue) => {
    nextTick(() => {
      if (!newValue) {
        dialogRef.value?.close()
        emit('close', props.option.id, selectedValue.value)
      } else {
        dialogRef.value?.showModal()
      }
    })
  },
  {
    immediate: true,
  },
)

const buttons = computed(() => {
  const buttons: ActionButton[] = props.option.buttons ?? []

  if ((props.option.buttons?.length ?? 0) === 0) {
    buttons.push({
      text: 'OK',
      color: 'button',
      value: undefined,
    })
  }

  return buttons
})

function handleClick(value: string | undefined) {
  selectedValue.value = value
  isOpen.value = false
}
</script>

<template>
  <dialog ref="dialogRef" class="backdrop-blur-md p-2">
    <div class="bg-menu-default flex flex-col gap-2">
      <!-- TODO: 変数が必要。テーブルヘッダと同じ -->
      <header class="bg-menu-hover p-2">{{ option.title }}</header>
      <main class="p-2">{{ option.message }}</main>
      <footer class="flex justify-center gap-2 p-2">
        <A2Button
          v-for="button in buttons"
          :key="button.value"
          size="m"
          :color="button.color"
          :icon="button.icon"
          :title="button.text"
          @click="() => handleClick(button.value)"
        />
      </footer>
    </div>
  </dialog>
</template>
