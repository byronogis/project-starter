<script setup lang="ts">
const sakaiStore = inject(SakaiStoreInjectionKey)!

const model = computed(() => toValue(sakaiStore.sidebarMenuList))
</script>

<template>
  <ul class="layout-menu component-sakai-menu">
    <template v-for="(item, i) in model" :key="i">
      <li v-if="item.separator" class="menu-separator" />

      <SakaiMenuItem v-else :item="item" :index="i" />
    </template>
  </ul>
</template>

<style lang="postcss" scoped></style>
