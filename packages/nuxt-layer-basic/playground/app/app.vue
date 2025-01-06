<script setup lang="ts">
const { state } = useBasicColorMode()
</script>

<template>
  <div class="nuxt-player-basic font-sans">
    <h1>Basic Nuxt Layer</h1>
    {{ state }}
  </div>
</template>

<style scoped lang="postcss"></style>
