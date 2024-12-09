<script setup lang="ts">
import { defu } from 'defu'
import PrimeChart from 'primevue/chart'

const props = withDefaults(defineProps<{
  type: PrimoChartType
  data?: object
  options?: object
  extra?: object
  noCard?: boolean
  // TODO pref 针对性禁用
  disabledGenerator?: boolean
}>(), {
  data: () => ({}),
  options: () => ({}),
  extra: () => ({}),
})

const primoStore = inject(PrimoStoreInjectionKey)!
const { isDark } = useSharedColorMode()

const options = ref<object>()

const plugins: any[] = [
  // ...
]

watchImmediate([
  () => primoStore.config.primary,
  () => primoStore.config.surface,
  isDark,
  () => props.options,
], () => {
  setColorOptions()
}, { deep: true })

function setColorOptions() {
  if (!import.meta.client) {
    return
  }

  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
  const surfaceBorderColor = documentStyle.getPropertyValue('--surface-border')

  const _generateOptions: PrimoChartGeneratorOptions = {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  }

  const _options = props.disabledGenerator
    ? {}
    : PrimoChartOptionsGeneratorsCST[props.type](_generateOptions)

  options.value = defu(
    props.options,
    {
      plugins: {
        // ...
      },
    },
    _options,
    primoChartOptionsGlobalGenerator(_generateOptions),
  )
}
</script>

<template>
  <div
    class="component-primo-chart"
    :class="[{
      card: !props.noCard,
    }]"
  >
    <PrimeChart
      :type="props.type"
      :data="props.data"
      :options
      :plugins
      class="h-full w-full"
      v-bind="props.extra"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
