<script setup lang="ts">
const menuList = ref<SakaiSidebarMenuItem[]>([
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: 'i-prime:home', to: '/' },
      { label: 'Mouse', icon: 'i-prime:book', to: '/mouse' },
      { label: 'Sakai', icon: 'i-prime:bell', to: '/sakai' },
    ],
  },
])

const title = ref('Sakai Layout')
</script>

<template>
  <SakaiLayout id="layout-sakai" :sidebar-munu-list="menuList" :title>
    <slot />
  </SakaiLayout>
</template>

<style scoped lang="postcss"></style>
