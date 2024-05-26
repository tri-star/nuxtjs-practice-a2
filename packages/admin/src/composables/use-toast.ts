export type ToastMessage = {
  type: 'success' | 'error'
  message: string
  durationMs: number
}

type ToastListItem = ToastMessage & {
  id: string
  bottomY: number
}

export function useToast() {
  const toasts = ref<ToastListItem[]>([])

  function createToast(message: ToastMessage) {
    const id = useId()
    const defaultMargin = 8
    const defaultBottomY = defaultMargin
    const maxBottomY = toasts.value.reduce<number>((min, toast) => Math.max(min, toast.bottomY), defaultBottomY)

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
  }

  return {
    toasts,

    createToast,
    handleDestroyToast,
  }
}
