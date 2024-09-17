<script setup lang="ts">
definePageMeta({
  layout: 'sakai',
})

const { x, y } = useMouse()
</script>

<template>
  <div>pos: {{ x }}, {{ y }}</div>
</template>
