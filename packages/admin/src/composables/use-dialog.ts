import { ulid } from 'ulid'
import type { ButtonColorVariant } from '~/components/a2-button'

export type ActionButton = {
  text: string
  color: ButtonColorVariant
  icon?: string
  value: string | undefined
}

export type DialogOption = {
  title: string
  message: string
  buttons?: ActionButton[]
}

export type DialogOptionWithId = {
  id: string
} & DialogOption

type DialogEntry = {
  isOpen: boolean
  option: DialogOptionWithId
  handleClose: (id: string, selectedValue: string | undefined) => void
}

export const useDialogStore = defineStore('DialogStore', () => {
  const dialogs = ref<DialogEntry[]>([])

  async function openDialog(option: DialogOption): Promise<string | undefined> {
    return new Promise((resolve) => {
      const newId = 'dialog-' + ulid()
      dialogs.value.push({
        isOpen: true,
        option: {
          id: newId,
          ...option,
        },
        handleClose: (id: string, selectedValue: string | undefined) => {
          handleCloseDialog(id)
          resolve(selectedValue)
        },
      })
    })
  }

  function handleCloseDialog(id: string) {
    dialogs.value = dialogs.value.filter((dialog) => {
      dialog.option.id !== id
    })
  }

  return {
    dialogs,
    openDialog,
    handleCloseDialog,
  }
})
