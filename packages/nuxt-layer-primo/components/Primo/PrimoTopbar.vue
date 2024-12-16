<script setup lang="ts">
const popoverRef = useTemplateRef('popoverRef')
</script>

<template>
  <div class="layout-topbar component-primo-topbar">
    <div class="layout-topbar-logo-container">
      <PrimoActionToogle />

      <PrimoTitle />
    </div>

    <PrimoAction class="ml-auto">
      <PrimeButton
        aria-label="More"
        variant="text"
        rounded
        severity="secondary"
        @click="popoverRef?.toggle"
      >
        <template #icon>
          <NuxtIcon name="i-prime:ellipsis-v" class="size-6" />
        </template>
      </PrimeButton>

      <PrimePopover
        ref="popoverRef"
        :pt="{
          content: 'flex flex-col items-start',
        }"
      >
        <PrimoActionExtra @hide-panel="popoverRef?.hide()" />
      </PrimePopover>
    </PrimoAction>
  </div>
</template>
