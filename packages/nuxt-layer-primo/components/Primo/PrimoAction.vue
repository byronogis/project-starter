<script setup lang="ts">
const primoStore = inject(PrimoStoreInjectionKey)!

const popoverRef = useTemplateRef('popoverRef')
</script>

<template>
  <div
    class="component-primo-action gap-2"
    :class="[
      primoStore.isMobile
        ? 'flex items-center justify-start '
        : 'grid grid-wrap-2.5rem',
    ]"
  >
    <PrimoActionApperance />
    <PrimoActionConfigurator />

    <template v-if="toValue(primoStore.extraActionList)?.length">
      <template v-if="primoStore.isMobile">
        <PrimeButton
          aria-label="More"
          variant="text"
          rounded
          severity="secondary"
          @click="popoverRef?.toggle"
        >
          <template #icon>
            <NuxtIcon name="i-prime:ellipsis-v" class="size-6" />
          </template>
        </PrimeButton>

        <PrimePopover
          ref="popoverRef"
          :pt="{
            content: 'flex flex-col items-start',
          }"
        >
          <PrimoActionExtra @hide-panel="popoverRef?.hide()" />
        </PrimePopover>
      </template>

      <template v-else>
        <PrimoActionExtra />
      </template>
    </template>
  </div>
</template>

<style scoped lang="postcss"></style>
