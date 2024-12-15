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
  topbarExtraActionList?: PrimoTopbarExtraActionItem[]
  sidebarMenuList?: PrimoSidebarMenuItem[]
  title?: string
}>()

const primoStore = usePrimoStore(props)

provide(PrimoStoreInjectionKey, primoStore)

const appSidebarRef = ref<InstanceType<typeof PrimoSidebar>>()
onClickOutside(appSidebarRef, () => primoStore.isMobile() && primoStore.resetMenu())

const containerClass = computed(() => {
  return {
    'layout-desktop-inactive': primoStore.state.menuDesktopInactive,
    'layout-mobile-active': primoStore.state.menuMobileActive,
  }
})
</script>

<template>
  <div class="layout-wrapper component-primo-layout-primary" :class="containerClass">
    <PrimoTopbar class="lg:hidden" />

    <PrimoSidebar ref="appSidebarRef" />

    <PrimoActionToogle
      class="fixed bottom-0 top-0 z-1000 m-auto hidden size-2.5rem transition-left duration-[--element-transition-duration] lg:block"
      :class="[primoStore.state.menuDesktopInactive ? 'left-0' : 'left-22rem']"
      data-allow-mismatch
    >
      <template #icon>
        <NuxtIcon
          data-allow-mismatch
          :name="primoStore.state.menuDesktopInactive ? 'i-prime:chevron-right' : 'i-prime:chevron-left'"
          class="size-6"
        />
      </template>
    </PrimoActionToogle>

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
