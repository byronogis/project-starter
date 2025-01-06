<script setup lang="ts">
const {
  toggle,
  state,
} = useBasicColorMode()

const colorModeIconName = computed(() => {
  if (toValue(state) === 'dark') {
    return 'i-prime:moon'
  }
  if (toValue(state) === 'light') {
    return 'i-prime:sun'
  }
  if (['auto', 'system'].includes(toValue(state))) {
    return 'i-prime:desktop'
  }
  return ''
})
</script>

<template>
  <div class="component-primo-action-appreance">
    <PrimeButton
      class="component-primo-action-appreance-btn"
      aria-label="Appearance"
      variant="text"
      rounded
      severity="secondary"
      @click="toggle"
    >
      <template #icon>
        <NuxtIcon :name="colorModeIconName" class="size-6" />
      </template>
    </PrimeButton>
  </div>
</template>

<style scoped lang="postcss"></style>
