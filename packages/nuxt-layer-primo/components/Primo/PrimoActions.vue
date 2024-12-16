<script setup lang="ts">
</script>

<template>
  <div
    class="component-primo-actions"
  >
    <PrimoActionApperance />
    <PrimoActionConfigurator />

    <slot />
  </div>
</template>

<style scoped lang="postcss">
.component-primo-actions {
  @apply gap-2 overflow-hidden;

  @apply lg:(grid grid-wrap-2.5rem [&>*]:place-self-center);

  @apply lt-lg:(flex items-center justify-start);
}
</style>
