<!-- eslint-disable import/order -->
<script setup lang="ts">
import { ElDatePicker } from 'element-plus'
// import type { DateModelType } from 'element-plus'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { DateType, OriginDateType } from './types'
// import { OriginDateType } from './types'
import DatePickerQuarterHalfYear from './DatePickerQuarterHalfYear.vue'
import DatePickerQuarterHalfYearRange from './DatePickerQuarterHalfYearRange.vue'

import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'

// 即 DateModelType ，由于目前 props 不支持外部类型
// 因此此处再次声明
type MyDateModelType = string | number | Date

interface Props {
  type: DateType
  modelValue: MyDateModelType | [MyDateModelType, MyDateModelType]
  popperClass?: string
  placeholder?: string

  // range extra
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

const props = withDefaults(defineProps<Props>(), {
  popperClass: '',
  placeholder: '选择日期',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  rangeSeparator: '至',
})

const emits = defineEmits(['update:modelValue'])

const originType: OriginDateType[]
  = [
    'year', 'month', 'date', 'dates', 'datetime', 'week',
    'datetimerange', 'daterange', 'monthrange',
  ]

// handle style
const enhancedPopperClass = computed(() => {
  return `${props.popperClass} el-picker__popper p-0`
})

// @ts-expect-error 无法提示实际存在的 scopeId/__hmrId test in vue v3.2.45
const scopedId = getCurrentInstance()?.type?.__hmrId
provide('scopedId', scopedId)
console.log(scopedId)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="component-datepicker-enhanced">
    <!-- 原始支持 -->
    <template v-if="originType.includes(props.type as OriginDateType)">
      <ElDatePicker
        v-bind="$attrs"
        :type="props.type as OriginDateType"
        :model-value="props.modelValue"
        :popper-class="props.popperClass"
        :placeholder="props.placeholder"
        :start-placeholder="props.startPlaceholder"
        :end-placeholder="props.endPlaceholder"
        :range-separator="props.rangeSeparator"
        @update:modelValue="emits('update:modelValue', $event)"
      >
        <slot name="default" />
        <slot name="range-separator" />
      </ElDatePicker>
    </template>

    <!-- 半年度 -->
    <template v-else-if="props.type === 'halfyear'">
      <DatePickerQuarterHalfYear
        type="halfyear"
        :model-value="Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue"
        :popper-class="enhancedPopperClass"
        :placeholder="props.placeholder"
        @update:modelValue="emits('update:modelValue', $event)"
      />
    </template>

    <!-- 季度 -->
    <template v-else-if="props.type === 'quarteryear'">
      <DatePickerQuarterHalfYear
        type="quarteryear"
        :model-value="Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue"
        :popper-class="enhancedPopperClass"
        :placeholder="props.placeholder"
        @update:modelValue="emits('update:modelValue', $event)"
      />
    </template>

    <!-- 半年度范围 -->
    <template v-else-if="props.type === 'halfyearrange'">
      <DatePickerQuarterHalfYearRange
        type="halfyearrange"
        :model-value="Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue, props.modelValue]"
        :popper-class="enhancedPopperClass"
        :start-placeholder="props.startPlaceholder"
        :end-placeholder="props.endPlaceholder"
        :range-separator="props.rangeSeparator"
        @update:modelValue="emits('update:modelValue', $event)"
      />
    </template>

    <!-- 季度范围 -->
    <template v-else-if="props.type === 'quarteryearrange'">
      <DatePickerQuarterHalfYearRange
        type="quarteryearrange"
        :model-value="Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue, props.modelValue]"
        :popper-class="enhancedPopperClass"
        :start-placeholder="props.startPlaceholder"
        :end-placeholder="props.endPlaceholder"
        :range-separator="props.rangeSeparator"
        @update:modelValue="emits('update:modelValue', $event)"
      />
    </template>
  </div>
</template>

<style scoped>
.p-0 {
    padding: 0;
}
</style>
