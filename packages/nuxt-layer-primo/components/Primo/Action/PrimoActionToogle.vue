<script setup lang="ts">
const primoStore = inject(PrimoStoreInjectionKey)!
</script>

<template>
  <div class="component-primo-action-toggle">
    <PrimeButton
      class="component-primo-action-toggle-btn"
      aria-label="Toggle"
      variant="text"
      rounded
      severity="secondary"
      @click="primoStore.onMenuToggle"
    >
      <template #icon>
        <NuxtIcon name="i-prime:bars" class="size-6" />
      </template>
    </PrimeButton>
  </div>
</template>

<style scoped lang="postcss"></style>
