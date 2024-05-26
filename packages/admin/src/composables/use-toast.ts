export type ToastMessage = {
  type: 'success' | 'error'
  message: string
  durationMs?: number
}

type ToastListItem = ToastMessage & {
  id: string
  bottomY: number
}

export const useToastStore = defineStore('toastStore', () => {
  const toasts = ref<ToastListItem[]>([])

  function createToast(message: ToastMessage) {
    const id = `toast-${Math.random().toString(36).substring(2, 9)}`
    const defaultMargin = 8
    const defaultBottomY = defaultMargin
    const maxBottomY = toasts.value.reduce<number>((min, toast) => {
      const toastElement = document.querySelector(`#${toast.id}`)
      const y = toastElement?.clientHeight ?? 0
      return Math.max(min, toast.bottomY + y)
    }, defaultBottomY)

    const newToastItem = {
      ...message,
      id,
      bottomY: maxBottomY + defaultMargin,
    }
    toasts.value.push(newToastItem)

    return newToastItem
  }

  function handleDestroyToast(id: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)

    const defaultMargin = 8
    let newBottomY = defaultMargin
    toasts.value = toasts.value.map((toast) => {
      toast.bottomY = newBottomY
      const toastElement = document.querySelector(`#${toast.id}`)
      const y = toastElement?.clientHeight ?? 0
      newBottomY += y + defaultMargin
      return toast
    })
  }

  return {
    toasts,

    createToast,
    handleDestroyToast,
  }
})
