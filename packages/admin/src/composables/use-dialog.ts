import { ulid } from 'ulid'

export type DialogOption = {
  title: string
  message: string
  closeText?: string
}

export type DialogOptionWithId = {
  id: string
} & DialogOption

type DialogState = {
  isOpen: boolean
  option: DialogOptionWithId
}

export const useDialogStore = defineStore('DialogStore', () => {
  const dialogs = ref<DialogState[]>([])

  function createDialog(option: DialogOption) {
    const newId = 'dialog-' + ulid()
    dialogs.value.push({
      isOpen: true,
      option: {
        id: newId,
        ...option,
      },
    })
  }

  function handleCloseDialog(id: string) {
    dialogs.value = dialogs.value.filter((dialog) => {
      dialog.option.id !== id
    })
  }

  return {
    dialogs,
    createDialog,
    handleCloseDialog,
  }
})
