<script setup lang="ts">
import PrimoConfigurator from './PrimoConfigurator.vue'

const {
  toggle,
  state,
} = useSharedColorMode()

const colorModeIconName = computed(() => {
  if (toValue(state) === 'dark') {
    return 'i-prime:moon'
  }
  if (toValue(state) === 'light') {
    return 'i-prime:sun'
  }
  if (['auto', 'system'].includes(toValue(state))) {
    return 'i-prime:desktop'
  }
  return ''
})
</script>

<template>
  <div class="component-primo-action layout-config-menu">
    <button type="button" class="layout-topbar-action" @click="toggle">
      <ClientOnly>
        <NuxtIcon :name="colorModeIconName" class="layout-topbar-action-icon" />
      </ClientOnly>
    </button>
    <div class="relative">
      <button
        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-fade-in animate-duration-150', leaveToClass: 'hidden', leaveActiveClass: 'animate-fade-out animate-duration-150', hideOnOutsideClick: true }"
        type="button"
        class="layout-topbar-action layout-topbar-action-highlight"
      >
        <NuxtIcon name="i-prime:palette" class="layout-topbar-action-icon" />
      </button>
      <PrimoConfigurator />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
