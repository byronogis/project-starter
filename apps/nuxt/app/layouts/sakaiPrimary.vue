<script setup lang="ts">
const sidebarMenuList = ref<SakaiSidebarMenuItem[]>([
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: 'i-prime:home', to: '/' },
      { label: 'Mouse', icon: 'i-prime:book', to: '/mouse' },
      { label: 'Sakai', icon: 'i-prime:bell', to: '/sakai' },
      { label: 'Crud', icon: 'i-prime:bell', to: '/crud' },
      { label: 'Login', icon: 'i-prime:bell', to: '/login' },
      { label: 'Chart', icon: 'i-prime:bell', to: '/chart' },
    ],
  },
])

const title = ref('Sakai Layout')
</script>

<template>
  <SakaiLayoutPrimary
    id="layout-sakai-primary"
    data-allow-mismatch
    :sidebar-menu-list
    :title
  >
    <slot />
  </SakaiLayoutPrimary>
</template>

<style scoped lang="postcss"></style>
