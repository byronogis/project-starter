<script setup lang="ts">
import { defu } from 'defu'
import Chart from 'primevue/chart'

const props = withDefaults(defineProps<{
  type: SakaiChartType
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

const sakaiStore = inject(SakaiStoreInjectionKey)!
const { isDark } = useSharedColorMode()

const options = ref<object>()

const plugins: any[] = [
  // ...
]

watchImmediate([
  () => sakaiStore.config.primary,
  () => sakaiStore.config.surface,
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

  const _generateOptions: SakaiChartGeneratorOptions = {
    textColor,
    textColorSecondary,
    surfaceBorderColor,
  }

  const _options = props.disabledGenerator
    ? {}
    : SakaiChartOptionsGeneratorsCST[props.type](_generateOptions)

  options.value = defu(
    props.options,
    {
      plugins: {
        // ...
      },
    },
    _options,
    sakaiChartOptionsGlobalGenerator(_generateOptions),
  )
}
</script>

<template>
  <div
    class="component-sakai-chart"
    :class="[{
      card: !props.noCard,
    }]"
  >
    <Chart
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
