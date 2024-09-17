<script setup lang="ts">
import { SakaiStoreInjectionKey } from '../../stores/sakai'
import SakaiMenuItem from './SakaiMenuItem.vue'

const sakaiStore = inject(SakaiStoreInjectionKey)!

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
