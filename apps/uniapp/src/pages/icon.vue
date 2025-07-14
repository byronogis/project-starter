<script setup lang="ts">
const colors = ['blue', 'red', 'green', 'yellow']
const currentColorIndex = ref(0)
const currentColor = computed(() => colors[currentColorIndex.value])
</script>

<template>
  <view class="flex flex-col items-center" :style="{ color: currentColor }">
    <i class="i-custom:logo-bun-reserved size-20" />

    <button class="rounded bg-gray-200" @click="currentColorIndex = (currentColorIndex + 1) % colors.length">
      Change Color
    </button>
    <text :class="`text-${currentColor}`">
      Current Color: {{ currentColor }}
    </text>
  </view>
</template>

<style scoped lang="postcss"></style>
