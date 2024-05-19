<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div class="page-example-vueuse">
    <p>{{ x }}, {{ y }}</p>
  </div>
</template>

<style scoped lang="postcss"></style>
