<script setup lang="ts">
import type { SakaiOptions } from '../../types/sakai'
import Toast from 'primevue/toast'
import { SakaiStoreInjectionKey, useSakaiStore } from '../../stores/sakai'
import SakaiFooter from './SakaiFooter.vue'
import SakaiSidebar from './SakaiSidebar.vue'
import SakaiTopbar from './SakaiTopbar.vue'

const props = defineProps<SakaiOptions>()

const sakaiStore = useSakaiStore(props)

provide(SakaiStoreInjectionKey, sakaiStore)

const appSidebarRef = ref<InstanceType<typeof SakaiSidebar>>()
onClickOutside(appSidebarRef, () => sakaiStore.resetMenu())

const containerClass = computed(() => {
  return {
    'layout-overlay': sakaiStore.config.menuMode === 'overlay',
    'layout-static': sakaiStore.config.menuMode === 'static',
    'layout-static-inactive': sakaiStore.state.staticMenuDesktopInactive && sakaiStore.config.menuMode === 'static',
    'layout-overlay-active': sakaiStore.state.overlayMenuActive,
    'layout-mobile-active': sakaiStore.state.staticMenuMobileActive,
  }
})
</script>

<template>
  <div class="layout-wrapper component-sakai-layout" :class="containerClass">
    <SakaiTopbar />
    <SakaiSidebar ref="appSidebarRef" />
    <div class="layout-main-container">
      <div class="layout-main">
        <slot />
      </div>
      <SakaiFooter />
    </div>
    <div class="layout-mask animate-fade-in animate-duration-150" />

    <Toast />
  </div>
</template>
