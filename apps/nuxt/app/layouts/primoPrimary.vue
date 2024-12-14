<script setup lang="ts">
const sidebarMenuList = ref<PrimoSidebarMenuItem[]>([
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: 'i-prime:home', to: '/' },
    ],
  },
  {
    label: 'Example',
    items: [
      { label: 'Mouse', icon: 'i-prime:book', to: '/example/mouse' },
      { label: 'Primo', icon: 'i-prime:bell', to: '/example/primo' },
      { label: 'Crud', icon: 'i-prime:bell', to: '/example/crud' },
      { label: 'Login', icon: 'i-prime:bell', to: '/example/login' },
      { label: 'Chart', icon: 'i-prime:bell', to: '/example/chart' },
    ],
  },
])

const title = ref(appCST.title)
</script>

<template>
  <PrimoLayoutPrimary
    id="layout-primo-primary"
    data-allow-mismatch
    :sidebar-menu-list
    :title
  >
    <slot />
  </PrimoLayoutPrimary>
</template>

<style scoped lang="postcss"></style>
