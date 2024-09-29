<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <SakaiPageError
    :title="String(props.error.statusCode)"
    :description="props.error.statusMessage"
  />
</template>
