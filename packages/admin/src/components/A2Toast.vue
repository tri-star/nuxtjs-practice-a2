<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(
  defineProps<{
    id: string
    type?: 'success' | 'error'
    message: string
    duration?: number
    bottomY?: number
  }>(),
  {
    type: 'success',
    duration: 3000,
    bottomY: 8,
  },
)

const emit = defineEmits<{
  destroy: [id: string]
}>()

const toastRef = ref<HTMLElement | null>(null)
const state = ref<'initial' | 'enter' | 'leave'>('initial')
const left = ref(0)

const variant = tv({
  base: [
    'block',
    'w-6/12',
    'justify-center',
    'items-center',
    'rounded-md',
    'drop-shadow-md',
    'min-h-10',
    'px-size-l-space-x',
    'py-size-l-space-y',
    'whitespace-pre',
    'absolute',
    'duration-300',
    'transform',
    'ease-in-out',
  ],
  variants: {
    type: {
      success: ['bg-success-default', 'border-success-border', 'text-on-success-default'],
      error: ['bg-error-default', 'border-error-border', 'text-on-error-default'],
    },
    state: {
      initial: ['translate-y-32', 'opacity-0'],
      enter: ['translate-y-0', 'opacity-100'],
      leave: ['translate-y-32', 'translate-x-8', 'opacity-0'],
    },
  },
})

const positionStyles = computed(() => {
  // left: 0px がDOMに反映されるとアニメーションがleft:0からスタートしてしまうので、
  // leftが1以上の時にstyleに反映されるようにする
  const styles: Record<string, string> = {
    bottom: `${props.bottomY}px`,
  }
  if (left.value) {
    styles['left'] = `${left.value}px`
  }
  return styles
})

let timerId: NodeJS.Timeout | undefined = undefined

onMounted(() => {
  setTimeout(() => {
    if (toastRef.value == null) {
      return
    }
    state.value = 'enter'

    const windowWidth = window.innerWidth
    const toastWidth = toastRef.value.clientWidth
    left.value = (windowWidth - toastWidth) / 2
  })

  timerId = setTimeout(() => {
    state.value = 'leave'
    setTimeout(() => {
      emit('destroy', props.id)
    }, 300)
  }, props.duration)
})

onBeforeUnmount(() => {
  clearTimeout(timerId)
})
</script>

<template>
  <div :id="id" ref="toastRef" :class="variant({ type, state })" :style="positionStyles">
    {{ message }}
  </div>
</template>
