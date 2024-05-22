<script setup lang="ts" generic="T = string">
const elementId = useId()

defineProps<{
  value: T
}>()

const model = defineModel<boolean | T[]>()


// const checked = computed<boolean>({
//   get: () => {
//     if (Array.isArray(model.value)) {
//       return model.value.includes(props.value)
//     }
//     return model.value ?? false
//   },
//   set: (newChecked: boolean) => {
//     if (Array.isArray(model.value)) {
//       if (newChecked) {
//         model.value = [...model.value, props.value]
//       } else {
//         model.value = model.value.filter((v) => v !== props.value)
//       }
//       return
//     }
//     model.value = newChecked
//   },
// })

const classeName = [
  'flex',
  'w-6',
  'h-6',
  'justify-center',
  'items-center',
  'border',
  'border-input-border',
  'rounded-md',
  'cursor-pointer',
  'shadow-inner',
  'bg-default',
  'has-[:checked]:bg-accent-primary-default',
  'active:scale-90',
  'translate-all',
  'duration-200',
  'focus:outline-none',
  'has-[:focus]:ring-2',
  'has-[:focus]:ring-offset-2',
  'has-[:focus]:ring-focus',
]
</script>

<template>
  <div class="">
    <label :for="elementId" :class="classeName">
      <input :id="elementId" v-model="model" type="checkbox" class="sr-only peer" :value="value" />
      <div class="hidden peer-checked:block">
        <Icon name="mdi:check-bold" class="text-on-accent-primary-default -translate-y-[1px]" size="16px" />
      </div>
    </label>
  </div>
</template>
