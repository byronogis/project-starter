<script setup lang="ts">
const primoStore = inject(PrimoStoreInjectionKey)!

const model = computed(() => toValue(primoStore.sidebarMenuList))
</script>

<template>
  <ul class="layout-menu component-primo-menu">
    <template v-for="(item, i) in model" :key="i">
      <li v-if="item.separator" class="menu-separator" />

      <PrimoMenuItem v-else :item="item" :index="i" />
    </template>
  </ul>
</template>

<style lang="postcss" scoped></style>
