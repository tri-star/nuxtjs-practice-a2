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
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height
    const margin = 8

    if (targetRect.left < boundingRect.left) {
      resultRect.left = margin
      resultRect.right = targetWidth + margin
    }
    if (targetRect.top < boundingRect.top) {
      resultRect.top = margin
      resultRect.bottom = targetHeight + margin
    }
    if (targetRect.right > boundingRect.right) {
      resultRect.right = boundingRect.right - margin
      resultRect.left = boundingRect.right - targetWidth - margin
    }
    if (targetRect.bottom > boundingRect.bottom) {
      resultRect.bottom = boundingRect.bottom - margin
      resultRect.top = resultRect.bottom - targetHeight - margin
    }

    return resultRect
  }

  return {
    adjustPositionToBounds,
  }
}
