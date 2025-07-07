<script setup lang="ts">
const num = ref(0)
const current = useTransition(num, {
  duration: 20_000,
  window: useAnimationFrameMock().api as unknown as Window,
})

onMounted(() => {
  console.info('transition mounted')
  num.value = 1000
})
</script>

<template>
  <div>{{ num }}</div>
  <div>{{ current.toFixed() }}</div>
</template>

<style scoped lang="postcss"></style>

<route lang="json">
  {}
  </route>
