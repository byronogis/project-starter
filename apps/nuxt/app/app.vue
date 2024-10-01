<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout class="font-sans">
    <NuxtPage />
  </NuxtLayout>

  <VueQueryDevtools />
</template>
