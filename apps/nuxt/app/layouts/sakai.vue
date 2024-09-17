<script setup lang="ts">
const sidebarMenuList = ref<SakaiSidebarMenuItem[]>([
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: 'i-prime:home', to: '/' },
      { label: 'Mouse', icon: 'i-prime:book', to: '/mouse' },
      { label: 'Sakai', icon: 'i-prime:bell', to: '/sakai' },
      { label: 'Crud', icon: 'i-prime:bell', to: '/crud' },
    ],
  },
])

const title = ref('Sakai Layout')
</script>

<template>
  <SakaiLayout
    id="layout-sakai"
    data-allow-mismatch
    :sidebar-menu-list
    :title
  >
    <slot />
  </SakaiLayout>
</template>

<style scoped lang="postcss"></style>
