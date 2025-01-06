<script setup lang="ts">
import PrimeDynamicDialog from 'primevue/dynamicdialog'
import PrimoFooter from '../PrimoFooter.vue'
import PrimoSidebar from '../PrimoSidebar.vue'
import PrimoTopbar from '../PrimoTopbar.vue'

// /**
//  * @vue-ignore
//  * @see https://github.com/vuejs/core/issues/11123
//  * @update 会造成props 丢失 到attrs 中 因此手动声明各属性类型
//  * TODO
//  */
// const props = defineProps</* @vue-ignore */ PrimoOptions>()
const props = defineProps<{
  extraActionList?: PrimoExtraActionItem[]
  sidebarMenuList?: PrimoSidebarMenuItem[]
  title?: string
}>()

const primoStore = usePrimoStore(props)

provide(PrimoStoreInjectionKey, primoStore)

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
  <div class="layout-wrapper component-primo-layout-primary" :class="containerClass">
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

    <PrimeToast />
    <PrimeDynamicDialog />
  </div>
</template>
