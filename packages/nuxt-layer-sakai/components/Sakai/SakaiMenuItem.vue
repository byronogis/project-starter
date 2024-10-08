<script setup lang="ts">
const props = withDefaults(defineProps<{
  item?: SakaiSidebarMenuItem
  index?: number
  root?: boolean
  parentItemKey?: string | null
}>(), {
  item: () => ({}),
  index: 0,
  root: true,
  parentItemKey: null,
})

const route = useRoute()

const sakaiStore = inject(SakaiStoreInjectionKey)!

const isActiveMenu = ref(false)
const itemKey = ref<string | null>(null)

/**
 * 高亮菜单项
 */
onBeforeMount(() => {
  itemKey.value = props.parentItemKey ? `${props.parentItemKey}-${props.index}` : String(props.index)

  const activeItem = sakaiStore.state.activeMenuItem

  isActiveMenu.value = (activeItem === itemKey.value || activeItem)
    ? activeItem.startsWith(`${itemKey.value}-`)
    : false
})

watch(
  () => sakaiStore.state.activeMenuItem,
  (newVal) => {
    isActiveMenu.value = newVal === itemKey.value || newVal!.startsWith(`${itemKey.value}-`)
  },
)

function itemClick(event: any, item: SakaiSidebarMenuItem, _index?: number) {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  if ((item.to || item.url) && (sakaiStore.state.staticMenuMobileActive || sakaiStore.state.overlayMenuActive)) {
    sakaiStore.onMenuToggle()
  }

  if (item.command) {
    item.command({ originalEvent: event, item })
  }

  const foundItemKey = item.items
    ? isActiveMenu.value
      ? props.parentItemKey
      : itemKey.value
    : itemKey.value

  sakaiStore.setActiveMenuItem(foundItemKey)
}

function checkActiveRoute(item: SakaiSidebarMenuItem) {
  return route.path === item.to
}
</script>

<template>
  <li
    data-allow-mismatch
    class="component-sakai-menu-item"
    :class="{
      'layout-root-menuitem': root,
      'active-menuitem': isActiveMenu,
    }"
  >
    <template v-if="!item.hidden">
      <div v-if="root" class="layout-menuitem-root-text">
        {{ item.label }}
      </div>

      <a
        v-if="(!item.to || item.items)"
        :href="item.url"
        :class="item.class"
        :target="item.target"
        tabindex="0"
        @click="itemClick($event, item, index)"
      >
        <i :class="item.icon" class="layout-menuitem-icon" />
        <span class="layout-menuitem-text">{{ item.label }}</span>
        <i v-if="item.items" class="layout-submenu-toggler i-prime:angle-down" />
      </a>

      <router-link
        v-if="item.to && !item.items"
        :class="[
          item.class,
          { 'active-route': checkActiveRoute(item) },
        ]"
        tabindex="0"
        :to="item.to"
        @click="itemClick($event, item, index)"
      >
        <i :class="item.icon" class="layout-menuitem-icon" />
        <span class="layout-menuitem-text">{{ item.label }}</span>
        <i v-if="item.items" class="i-prime:angle-down layout-submenu-toggler" />
      </router-link>

      <Transition v-if="item.items" name="layout-submenu">
        <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
          <SakaiMenuItem
            v-for="(child, i) in item.items"
            :key="child.to"
            :index="i"
            :item="child"
            :parent-item-key="itemKey"
            :root="false"
          />
        </ul>
      </Transition>
    </template>
  </li>
</template>

<style lang="postcss" scoped></style>
