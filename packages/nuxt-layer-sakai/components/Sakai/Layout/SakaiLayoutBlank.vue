<script setup lang="ts">
// /**
//  * @vue-ignore
//  * @see https://github.com/vuejs/core/issues/11123
//  * @update 会造成props 丢失 到attrs 中 因此手动声明各属性类型
//  * TODO
//  */
// const props = defineProps</* @vue-ignore */ SakaiOptions>()
const props = defineProps<{
  sidebarMenuList?: SakaiSidebarMenuItem[]
  title?: string
}>()

const sakaiStore = useSakaiStore(props)

provide(SakaiStoreInjectionKey, sakaiStore)
</script>

<template>
  <div class="component-sakai-layout-blank min-h-100vh">
    <slot />
  </div>
</template>
