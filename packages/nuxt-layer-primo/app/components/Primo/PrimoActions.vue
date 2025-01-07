<script setup lang="ts">
const props = defineProps<{
  showExtra?: boolean
}>()

const popoverRef = useTemplateRef('popoverRef')

const primoStore = usePrimoStore()!
</script>

<template>
  <div
    class="component-primo-actions flex items-center justify-start gap-2"
  >
    <PrimoActionApperance />
    <PrimoActionConfigurator />

    <template v-if="props.showExtra && primoStore.extraActionList?.length">
      <PrimeButton
        aria-label="More"
        variant="text"
        rounded
        class="lg:hidden"
        severity="secondary"
        @click="popoverRef?.toggle"
      >
        <template #icon>
          <NuxtIcon name="i-prime:ellipsis-v" class="size-6" />
        </template>
      </PrimeButton>

      <div class="hidden lg:block">
        <PrimoActionExtra @hide-panel="popoverRef?.hide()" />
      </div>

      <PrimePopover
        ref="popoverRef"
        :pt="{
          content: 'flex flex-col items-start',
        }"
      >
        <PrimoActionExtra @hide-panel="popoverRef?.hide()" />
      </PrimePopover>
    </template>
  </div>
</template>

<style scoped lang="postcss"></style>
