<script setup lang="ts">
const sakaiStore = useSakaiStore()

const model = computed(() => sakaiStore.sidebarMunuList)
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <li v-if="item.separator" class="menu-separator" />
      <SakaiMenuItem v-else :item="item" :index="i" />
    </template>
  </ul>
</template>

<style lang="postcss" scoped></style>
