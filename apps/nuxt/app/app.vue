<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const globalToast = useSakaiToast()
provide(SakaiToastInjectionKey, globalToast)
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout class="font-sans">
    <NuxtPage />
  </NuxtLayout>

  <Toast />

  <VueQueryDevtools />
</template>
