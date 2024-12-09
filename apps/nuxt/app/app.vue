<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const globalToast = useGlobalToast()
provide(PrimoToastInjectionKey, globalToast)
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout class="font-sans">
    <NuxtPage />
  </NuxtLayout>

  <PrimeToast :group="PrimoToastGroupGlobalCST" />

  <VueQueryDevtools />
</template>
