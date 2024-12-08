<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const description = computed(() => props.error.statusMessage
  || props.error.message
  || 'An error occurred',
)
</script>

<template>
  <PrimoLayoutBlank>
    <PrimoPageError
      :title="String(props.error.statusCode)"
      :description
    />
  </PrimoLayoutBlank>
</template>
