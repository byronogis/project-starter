<script setup lang="ts">
/**
 * 由于小程序中使用 requestAnimationFrame 需要通过 canvas 来实现
 *
 * 这里使用一个隐藏的 canvas 以及 useAnimationFrameMock 来模拟 requestAnimationFrame 的行为
 */

const props = withDefaults(defineProps<{
  /**
   * 画布id attribute
   * @default 'animation-frame-mock'
   */
  canvasId?: string
}>(), {
  canvasId: 'animation-frame-mock',
})

/** Canvas 实例，通过 SelectorQuery 获取  */
const canvas = ref<any>()

function getCanvas() {
  return new Promise((resolve) => {
    uni.createSelectorQuery()
      .select(`#${props.canvasId}`)
      .node(({ node }) => {
        canvas.value = node

        /** 将 animationFrameMock 挂载到 uni 对象上 */
        uni._animationFrameMock = node

        resolve(node)
      })
      .exec()
  })
}

onMounted(() => {
  getCanvas()
})

defineExpose({
  canvas,
})
</script>

<template>
  <canvas
    :id="props.canvasId"
    :canvas-id="props.canvasId"
    type="2d"
    style="width: 0; height: 0; pointer-events: none;"
  />
</template>

<style scoped lang="postcss"></style>
