<script setup lang="ts">
import PrimoFooter from '../PrimoFooter.vue'
import PrimoSidebar from '../PrimoSidebar.vue'
import PrimoTopbar from '../PrimoTopbar.vue'

const primoStore = usePrimoStore()!

const appSidebarRef = ref<InstanceType<typeof PrimoSidebar>>()
onClickOutside(appSidebarRef, () => primoStore.resetMenu())

const containerClass = computed(() => {
  return {
    'layout-overlay': primoStore.config.menuMode === 'overlay',
    'layout-static': primoStore.config.menuMode === 'static',
    'layout-static-inactive': primoStore.state.staticMenuDesktopInactive && primoStore.config.menuMode === 'static',
    'layout-overlay-active': primoStore.state.overlayMenuActive,
    'layout-mobile-active': primoStore.state.staticMenuMobileActive,
  }
})
</script>

<template>
  <div class="layout-wrapper component-primo-layout-primary" data-allow-mismatch :class="containerClass">
    <PrimoTopbar>
      <template #logo>
        <slot name="topbar-logo" />
      </template>
    </PrimoTopbar>

    <PrimoSidebar ref="appSidebarRef" />

    <div class="layout-main-container">
      <div class="layout-main">
        <slot />
      </div>

      <PrimoFooter>
        <template #default>
          <slot name="footer" />
        </template>
      </PrimoFooter>
    </div>
    <div class="layout-mask animate-fade-in animate-duration-150" />
  </div>
</template>
