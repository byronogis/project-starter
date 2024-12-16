<script setup lang="ts">
</script>

<template>
  <div class="layout-sidebar component-primo-sidebar grid grid-rows-[auto_1fr_auto] gap-2 lg:p-0">
    <PrimoTitle class="!lt-lg:hidden" />

    <PrimeScrollPanel class="min-h-0">
      <PrimoMenu />
    </PrimeScrollPanel>

    <PrimoActions class="!lt-lg:hidden">
      <PrimoActionExtra />
    </PrimoActions>
  </div>
</template>

<style lang="postcss" scoped></style>
