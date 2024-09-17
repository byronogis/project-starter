<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <VueQueryDevtools />
</template>
