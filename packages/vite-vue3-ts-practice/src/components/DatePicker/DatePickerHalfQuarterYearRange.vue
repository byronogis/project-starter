<!-- eslint-disable unused-imports/no-unused-imports -->
<script setup lang="ts">
// import DatePickerHalfQuarterYear from './DatePickerHalfQuarterYear.vue'
import { Calendar, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import DatePickerHalfQuarterYearPanelWrapper from './DatePickerHalfQuarterYearPanelWrapper.vue'
import DatePickerHalfQuarterYearPanel from './DatePickerHalfQuarterYearPanel.vue'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'
import type { ViewItem } from './types'
import useDatePickerHalfQuarterYear from './useDatePickerHalfQuarterYear'

const props = defineProps<{
  type: 'quarteryearrange' | 'halfyearrange'
}>()
const attrs = useAttrs()

const leftPanel = useDatePickerHalfQuarterYear(props, attrs)
const rightPanel = useDatePickerHalfQuarterYear(props, attrs, leftPanel.popover.property)
</script>

<template>
  <el-popover
    v-bind="leftPanel.popover.property"
    width="auto"
  >
    <!--  -->
    <template #reference>
      <DatePickerRangeInput
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
            class="el-date-range-picker__content is-left"
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
            class="el-date-range-picker__content is-right"
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
