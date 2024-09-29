<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <SakaiLayoutBlank>
    <SakaiPageError
      :title="String(props.error.statusCode)"
      :description="props.error.statusMessage"
    />
  </SakaiLayoutBlank>
</template>
