<script setup lang="ts">
import { SakaiStoreInjectionKey, useSakaiStore } from '../../stores/sakai'

const sakaiStore = useSakaiStore()
provide(SakaiStoreInjectionKey, sakaiStore)
</script>

<template>
  <div class="component-sakai-chart">
    //
  </div>
</template>

<style scoped lang="postcss"></style>
