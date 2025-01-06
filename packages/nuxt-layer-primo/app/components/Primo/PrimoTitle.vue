<script setup lang="ts">
const primoStore = inject(PrimoStoreInjectionKey)!
</script>

<template>
  <NuxtLink to="/" class="component-primo-title flex items-center gap-2">
    <NuxtIcon name="i-primo:logo" class="size-12 color-[var(--primary-color)]" />

    <span class="line-clamp-1 text-6 font-500">{{ primoStore.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="postcss"></style>
