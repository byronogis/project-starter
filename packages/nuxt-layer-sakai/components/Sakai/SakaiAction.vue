<script setup lang="ts">
import SakaiConfigurator from './SakaiConfigurator.vue'

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
  <div class="component-sakai-action layout-config-menu">
    <button type="button" class="layout-topbar-action" @click="toggle()">
      <ClientOnly>
        <i :class="colorModeIconName" />
      </ClientOnly>
    </button>
    <div class="relative">
      <button
        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-fade-in animate-duration-150', leaveToClass: 'hidden', leaveActiveClass: 'animate-fade-out animate-duration-150', hideOnOutsideClick: true }"
        type="button"
        class="layout-topbar-action layout-topbar-action-highlight"
      >
        <i class="i-prime:palette" />
      </button>
      <SakaiConfigurator />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
