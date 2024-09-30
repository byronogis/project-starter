<script setup lang="ts">
import DynamicDialog from 'primevue/dynamicdialog'
import SakaiFooter from '../SakaiFooter.vue'
import SakaiSidebar from '../SakaiSidebar.vue'
import SakaiTopbar from '../SakaiTopbar.vue'

// /**
//  * @vue-ignore
//  * @see https://github.com/vuejs/core/issues/11123
//  * @update 会造成props 丢失 到attrs 中 因此手动声明各属性类型
//  * TODO
//  */
// const props = defineProps</* @vue-ignore */ SakaiOptions>()
const props = defineProps<{
  sidebarMenuList?: SakaiSidebarMenuItem[]
  title?: string
}>()

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
  <div class="layout-wrapper component-sakai-layout-primary" :class="containerClass">
    <SakaiTopbar>
      <template #logo>
        <slot name="topbar-logo" />
      </template>

      <template #extra-actions>
        <slot name="topbar-extra-actions" />
      </template>
    </SakaiTopbar>

    <SakaiSidebar ref="appSidebarRef" />

    <div class="layout-main-container">
      <div class="layout-main">
        <slot />
      </div>

      <SakaiFooter>
        <template #default>
          <slot name="footer" />
        </template>
      </SakaiFooter>
    </div>
    <div class="layout-mask animate-fade-in animate-duration-150" />

    <Toast />
    <DynamicDialog />
  </div>
</template>
