<!-- eslint-disable unused-imports/no-unused-imports -->
<script setup lang="ts">
// 基于 See https://blog.csdn.net/qq1370151551/article/details/118811216
import DatePickerHalfQuarterYearPanelWrapper from './DatePickerHalfQuarterYearPanelWrapper.vue'
import DatePickerHalfQuarterYearPanel from './DatePickerHalfQuarterYearPanel.vue'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'
import type { Attrs } from './types'
import useDatePickerHalfQuarterYear from './useDatePickerHalfQuarterYear'

const props = defineProps<{
  type: 'quarteryear' | 'halfyear'
}>()

const attrs = useAttrs() as unknown

const {
  popover,
  input,
  datepicker,
  event,
} = useDatePickerHalfQuarterYear(props, toRefs(attrs as Attrs))

const scopedId = inject<string>('scopedId')
const datepickerHalfQuarterYearRef = ref<any>(null)
watchEffect(() => {
  const popper = datepickerHalfQuarterYearRef.value?.popperRef?.contentRef as HTMLDivElement
  popper?.setAttribute(`data-v-${scopedId}`, '')
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <el-popover
    ref="datepickerHalfQuarterYearRef"
    v-bind="popover.property"
    width="auto"
  >
    <template #reference>
      <!-- 使用 click 而不是 focus
        防止选择完成后 datepicker_clickViewItem 把 visible 设为 false
        但因为焦点回到输入框后导致的 visible 自动设为 true 而致使弹出层视觉上的不会自动消失
      -->
      <!-- <el-input
        class="el-date-editor el-date-editor--month"
        v-bind="input.property"
        :prefix-icon="Calendar"
        @update:modelValue="event.input_setValue"
        @click="() => popover.property.visible = true"
        @blur="() => popover.property.visible = false"
      /> -->
      <DatePickerInput
        v-bind="input.property"
        @update:modelValue="$attrs['onUpdate:modelValue']"
        @update:popoverVisible="(status: boolean) => popover.property.visible = status"
      />
    </template>

    <template #default>
      <DatePickerHalfQuarterYearPanelWrapper
        @update:popover-visible="(status: boolean) => popover.property.visible = status"
      >
        <template #default>
          <DatePickerHalfQuarterYearPanel
            :datepicker_view-title="datepicker.viewTitle.value"
            :datepicker_view-lines="datepicker.viewLines.value"
            :datepicker_view-items="datepicker.property.viewItems"
            @datepicker_click-prev="event.datepicker_clickPrev"
            @datepicker_click-next="event.datepicker_clickNext"
            @datepicker_click-view-title="event.datepicker_clickViewTitle"
            @datepicker_click-view-item="event.datepicker_clickViewItem"
          />
        </template>
      </DatePickerHalfQuarterYearPanelWrapper>
    </template>
  </el-popover>
</template>
