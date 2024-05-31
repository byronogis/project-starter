<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <div class="page-example-query">
    <RouterView />

    <VueQueryDevtools />
  </div>
</template>

<style scoped lang="postcss"></style>
