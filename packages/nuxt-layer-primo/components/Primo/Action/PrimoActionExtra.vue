<script setup lang="ts">
const emits = defineEmits<{
  hidePanel: []
}>()

const primoStore = inject(PrimoStoreInjectionKey)!

async function handleTopbarExtraActionClick(e: MouseEvent, action: PrimoExtraActionItem) {
  const _closeTiming = action.closePopover ?? 'begining'
  const _closeFn = () => emits('hidePanel')

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
  <template
    v-for="(action, index) in toValue(primoStore.extraActionList)"
    :key="index"
  >
    <component :is="action.custom" v-if="action.custom" />

    <PrimeButton
      v-else
      variant="text"
      severity="secondary"
      :style="{ order: action.order }"
      :aria-label="action.label"
      :label="action.label"
      :pt="{
        root: 'lg:rounded-full',
        label: 'lg:hidden',
      }"
      @click="handleTopbarExtraActionClick($event, action)"
    >
      <template #icon>
        <NuxtIcon :name="action.icon" class="size-6" />
      </template>
    </PrimeButton>
  </template>
</template>

<style scoped lang="postcss"></style>
