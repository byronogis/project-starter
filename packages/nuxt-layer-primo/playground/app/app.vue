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
      { label: 'Crud', icon: 'i-prime:bell', to: '/example/crud' },
      { label: 'Primo', icon: 'i-prime:bell', to: '/example/primo' },
      { label: 'Chart', icon: 'i-prime:bell', to: '/example/chart' },
    ],
  },
  {
    label: 'Page',
    items: [
      { label: 'Login', icon: 'i-prime:sign-in', to: '/page/login' },
    ],
  },
])

const dialog = usePrimoDialog()
const toast = usePrimoToast()

const extraActionList = ref<PrimoExtraActionItem[]>([
  {
    label: 'Profile',
    icon: 'i-prime:user',
    onClick: () => console.log('Profile'),
  },
  {
    label: 'Setting',
    icon: 'i-prime:cog',
    onClick: () => console.log('Setting'),
  },
  {
    label: 'Logout',
    icon: 'i-prime:sign-out',
    onClick: () => dialog.dialogConfirm({
      header: 'Logout',
      message: h('p', { class: 'w-80' }, 'Are you sure?'),
      confirmFn: async () => {
        await Utils._.delay(2000)
        toast.toastSuccess('Logout success')
      },
    }),
  },
])

const title = 'Primo Nuxt Layer'
</script>

<template>
  <PrimoApp
    :sidebar-menu-list
    :extra-action-list
    :title
  >
    <NuxtLayout class="font-sans">
      <NuxtPage />
    </NuxtLayout>
  </PrimoApp>
</template>

<style>
@import '@unocss/reset/tailwind.css' layer(reset);
</style>
