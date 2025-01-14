<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const { state, toggle } = useBasicColorMode()

const title = 'Primo Nuxt Layer'
useTitle(title)
</script>

<template>
  <div class="flex flex-col items-center justify-center font-sans [*:has(>&)]:(grid place-content-center) space-y-2">
    <h1 class="text-2xl font-bold">
      {{ title }}
    </h1>
    <button @click="toggle">
      {{ state }}
    </button>
  </div>
</template>
