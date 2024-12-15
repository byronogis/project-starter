<script setup lang="ts">
const primoStore = inject(PrimoStoreInjectionKey)!

const topbarElRef = useTemplateRef('topbarElRef')
async function handleTopbarExtraActionClick(e: MouseEvent, action: PrimoTopbarExtraActionItem) {
  const _closeTiming = action.closePopover
  const _closeFn = () => topbarElRef.value?.classList.add('hidden')

  _closeTiming === 'begining' && _closeFn()

  try {
    await action.onClick(e)
    _closeTiming === 'end' && _closeFn()
  }
  catch (error: any) {
    _closeTiming === 'end-force' && _closeFn()
    throw new Error(error?.message ?? error)
  }
}
</script>

<template>
  <div class="layout-topbar component-primo-topbar">
    <div class="layout-topbar-logo-container">
      <PrimoActionToogle />

      <PrimoTitle />
    </div>

    <div class="layout-topbar-actions">
      <PrimoAction />

      <template v-if="toValue(primoStore.topbarExtraActionList)?.length">
        <button
          v-styleclass="primoStore.styleClass.actionBtn"
          class="layout-topbar-action layout-topbar-menu-button"
        >
          <NuxtIcon name="i-prime:ellipsis-v" class="layout-topbar-action-icon" />
        </button>

        <div ref="topbarElRef" class="layout-topbar-menu hidden lg:block">
          <div class="layout-topbar-menu-content">
            <template
              v-for="(action, index) in toValue(primoStore.topbarExtraActionList)"
              :key="index"
            >
              <button
                type="button"
                class="layout-topbar-action"
                :style="{ order: action.order }"
                @click="handleTopbarExtraActionClick($event, action)"
              >
                <component :is="action.custom" v-if="action.custom" />

                <template v-else>
                  <NuxtIcon :name="action.icon" class="layout-topbar-action-icon" />
                  <span class="layout-topbar-action-label">{{ action.label }}</span>
                </template>
              </button>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
