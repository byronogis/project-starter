<script setup lang="ts">
import { isShared } from '@project-starter/shared'
</script>

<template>
  <div class="page-example-shared">
    {{ isShared(true) ? 'Shared' : 'Not Shared' }}
  </div>
</template>

<style scoped lang="postcss"></style>
