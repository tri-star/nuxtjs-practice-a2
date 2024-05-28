export function useAnchorPosition() {
  function adjustPositionToBounds(targetElement: Ref<HTMLElement>) {
    const boundingRect = {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
    }

    const targetRect = targetElement.value?.getBoundingClientRect()
    if (targetElement === undefined) {
      throw new Error('要素が見つかりません。')
    }

    const resultRect = {
      left: targetRect.left,
      top: targetRect.top,
      right: targetRect.right,
      bottom: targetRect.bottom,
    }
    const margin = 8

    if (targetRect.left < boundingRect.left) {
      resultRect.left = boundingRect.left + margin
    }
    if (targetRect.top < boundingRect.top) {
      resultRect.top = boundingRect.top + margin
    }
    if (targetRect.right < boundingRect.right) {
      resultRect.right = boundingRect.right - margin
    }
    if (targetRect.bottom < boundingRect.bottom) {
      resultRect.bottom = boundingRect.bottom - margin
    }
  }

  return {
    adjustPositionToBounds,
  }
}
