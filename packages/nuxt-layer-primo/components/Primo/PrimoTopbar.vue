<script setup lang="ts">
const popoverRef = useTemplateRef('popoverRef')
</script>

<template>
  <div class="layout-topbar component-primo-topbar">
    <PrimoActionToogle />

    <PrimoTitle />

    <PrimoActions class="ml-auto">
      <PrimeButton
        aria-label="More"
        variant="text"
        rounded
        class="lg:hidden"
        severity="secondary"
        @click="popoverRef?.toggle"
      >
        <template #icon>
          <NuxtIcon name="i-prime:ellipsis-v" class="size-6" />
        </template>
      </PrimeButton>

      <div class="hidden lg:block">
        <PrimoActionExtra @hide-panel="popoverRef?.hide()" />
      </div>

      <PrimePopover
        ref="popoverRef"
        :pt="{
          content: 'flex flex-col items-start',
        }"
      >
        <PrimoActionExtra @hide-panel="popoverRef?.hide()" />
      </PrimePopover>
    </PrimoActions>
  </div>
</template>
