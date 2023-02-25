<script setup lang="ts">
import DatePickerHalfQuarterYearPanelWrapper from './DatePickerHalfQuarterYearPanelWrapper.vue'
import DatePickerHalfQuarterYearPanel from './DatePickerHalfQuarterYearPanel.vue'
import useDatePickerHalfQuarterYear from './useDatePickerHalfQuarterYear'

const props = defineProps<{
  type: 'quarteryearrange' | 'halfyearrange'
}>()
const emits = defineEmits(['update:modelValue'])
const attrs = useAttrs()

const leftPanel = useDatePickerHalfQuarterYear(props, emits, toRefs(attrs))
const rightPanel = useDatePickerHalfQuarterYear(props, emits, toRefs(attrs), leftPanel.popover.property)

const scopedId = inject<string>('scopedId')
const datepickerHalfQuarterYearRangeRef = ref<any>(null)
watchEffect(() => {
  const popper = datepickerHalfQuarterYearRangeRef.value?.popperRef?.contentRef as HTMLDivElement
  popper?.setAttribute(`data-v-${scopedId}`, '')
})

const updateModelValueFn = (val: string, idx: number) => {
  switch (idx) {
    case 0:
      emits('update:modelValue', [val, attrs.modelValue?.[1]])
      break
    case 1:
      emits('update:modelValue', [attrs.modelValue?.[0], val])
      break

    default:
      break
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <el-popover
    ref="datepickerHalfQuarterYearRangeRef"
    v-bind="leftPanel.popover.property"
    width="auto"
  >
    <!--  -->
    <template #reference>
      <DatePickerRangeInput
        v-bind="{ left: leftPanel.input.property, right: rightPanel.input.property }"
        @update:modelValue="updateModelValueFn"
        @update:popover-visible="(status: boolean) => leftPanel.popover.property.visible = status"
      />
    </template>
    <!--  -->
    <template #default>
      <DatePickerHalfQuarterYearPanelWrapper
        is-range
        @update:popover-visible="(status: boolean) => leftPanel.popover.property.visible = status"
      >
        <template #range-left>
          <!-- left -->
          <DatePickerHalfQuarterYearPanel
            class="el-date-range-picker__content is-left p-0"
            :datepicker_view-title="leftPanel.datepicker.viewTitle.value"
            :datepicker_view-lines="leftPanel.datepicker.viewLines.value"
            :datepicker_view-items="leftPanel.datepicker.property.viewItems"
            @datepicker_click-prev="leftPanel.event.datepicker_clickPrev"
            @datepicker_click-next="leftPanel.event.datepicker_clickNext"
            @datepicker_click-view-title="leftPanel.event.datepicker_clickViewTitle"
            @datepicker_click-view-item="leftPanel.event.datepicker_clickViewItem"
          />
        </template>

        <template #range-right>
          <!-- right -->
          <DatePickerHalfQuarterYearPanel
            class="el-date-range-picker__content is-right p-0"
            :datepicker_view-title="rightPanel.datepicker.viewTitle.value"
            :datepicker_view-lines="rightPanel.datepicker.viewLines.value"
            :datepicker_view-items="rightPanel.datepicker.property.viewItems"
            @datepicker_click-prev="rightPanel.event.datepicker_clickPrev"
            @datepicker_click-next="rightPanel.event.datepicker_clickNext"
            @datepicker_click-view-title="rightPanel.event.datepicker_clickViewTitle"
            @datepicker_click-view-item="rightPanel.event.datepicker_clickViewItem"
          />
        </template>
      </DatePickerHalfQuarterYearPanelWrapper>
    </template>
  </el-popover>
</template>
