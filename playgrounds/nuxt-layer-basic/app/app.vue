<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const { state, toggle } = useBasicColorMode()

const title = 'Basic Nuxt Layer'
useTitle(title)

useHead({
  style: [
    {
      textContent: `@layer reset, nuxt-layer-basic;`,
      tagPriority: 1,
    },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center font-sans space-y-2 dark:bg-gray-800 dark:text-white">
    <h1 class="text-2xl font-bold">
      {{ title }}
    </h1>
    <button @click="toggle">
      {{ state }}
    </button>
  </div>
</template>

<style>
@import '@unocss/reset/tailwind.css' layer(reset);
</style>
