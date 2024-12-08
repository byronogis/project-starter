<script setup lang="ts">
const sidebarMenuList = ref<PrimoSidebarMenuItem[]>([
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: 'i-prime:home', to: '/' },
      { label: 'Mouse', icon: 'i-prime:book', to: '/mouse' },
      { label: 'Primo', icon: 'i-prime:bell', to: '/primo' },
      { label: 'Crud', icon: 'i-prime:bell', to: '/crud' },
      { label: 'Login', icon: 'i-prime:bell', to: '/login' },
      { label: 'Chart', icon: 'i-prime:bell', to: '/chart' },
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
