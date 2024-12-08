<script setup lang="ts">
// /**
//  * @vue-ignore
//  * @see https://github.com/vuejs/core/issues/11123
//  * @update 会造成props 丢失 到attrs 中 因此手动声明各属性类型
//  * TODO
//  */
// const props = defineProps</* @vue-ignore */ PrimoOptions>()
const props = defineProps<{
  sidebarMenuList?: PrimoSidebarMenuItem[]
  title?: string
}>()

const primoStore = usePrimoStore(props)

provide(PrimoStoreInjectionKey, primoStore)
</script>

<template>
  <div class="layout-wrapper component-primo-layout-blank">
    <slot />

    <Toast />
  </div>
</template>
