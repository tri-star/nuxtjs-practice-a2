export function useBulkCheck(allIdListRef: Ref<string[]>) {
  const idList = ref<string[]>([])
  const isAllChecked = ref(false)

  watch(idList, () => {
    if (idList.value.length !== allIdListRef.value.length) {
      isAllChecked.value = false
    } else {
      isAllChecked.value = true
    }
  })

  function handleToggleCheckAll() {
    if (isAllChecked.value) {
      idList.value = allIdListRef.value
    } else {
      idList.value = []
    }
  }

  return {
    idList,
    isAllChecked,

    handleToggleCheckAll,
  }
}
