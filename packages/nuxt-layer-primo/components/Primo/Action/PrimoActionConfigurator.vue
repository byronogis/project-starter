<script setup lang="ts">
const popoverRef = useTemplateRef('popoverRef')
</script>

<template>
  <div class="component-primo-action-configurator">
    <PrimeButton
      class="component-primo-action-configurator-btn"
      aria-label="Configurator"
      rounded
      @click="popoverRef?.toggle"
    >
      <template #icon>
        <NuxtIcon name="i-prime:palette" class="size-6" />
      </template>
    </PrimeButton>

    <PrimePopover ref="popoverRef">
      <PrimoConfigurator />
    </PrimePopover>
  </div>
</template>

<style scoped lang="postcss"></style>
