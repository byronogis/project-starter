<script setup lang="ts">
</script>

<template>
  <div
    class="component-primo-actions gap-2 lg:(grid grid-wrap-2.5rem) lt-lg:(flex items-center justify-start)"
  >
    <PrimoActionApperance />
    <PrimoActionConfigurator />

    <slot />
  </div>
</template>

<style scoped lang="postcss"></style>
