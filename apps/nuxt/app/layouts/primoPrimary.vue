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
    label: 'Setting',
    icon: 'i-prime:cog',
    onClick: () => console.log('Setting'),
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
      message: h('p', { class: 'w-80' }, 'Are you sure?'),
      confirmFn: async () => {
        await Utils._.delay(2000)
        toast.toastSuccess('Logout success')
      },
    }),
  },
])

const title = ref(appCST.title)
</script>

<template>
  <PrimoLayoutPrimary
    id="layout-primo-primary"
    data-allow-mismatch
    :sidebar-menu-list
    :extra-action-list
    :title
  >
    <slot />
  </PrimoLayoutPrimary>
</template>

<style scoped lang="postcss"></style>
