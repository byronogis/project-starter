<script setup lang="ts">
import DatePickerrHalfQuarterYear from './DatePickerHalfQuarterYear.vue'

type DateType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'

const props = defineProps<{
  type: 'halfyear' | 'quarteryear' | Partial<DateType>
}>()

const originType
  = ['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange']

// @ts-expect-error 无法提示实际存在的 scopeId/__hmrId test in vue v3.2.45
const scopedId = getCurrentInstance()?.type?.__hmrId
provide('scopedId', scopedId)
</script>

<template>
  <div class="component-datepicker-enhanced">
    <!-- 原始支持 -->
    <template v-if="originType.includes(props.type)">
      <el-date-picker
        v-bind="$attrs"
        :type="props.type"
      >
        <slot name="default" />
        <slot name="range-separator" />
      </el-date-picker>
    </template>

    <!-- 半年度 -->
    <template v-else-if="props.type === 'halfyear'">
      <DatePickerrHalfQuarterYear
        v-bind="$attrs"
        type="halfyear"
      />
    </template>

    <!-- 季度 -->
    <template v-else-if="props.type === 'quarteryear'">
      <DatePickerrHalfQuarterYear
        v-bind="$attrs"
        type="quarteryear"
      />
    </template>
  </div>
</template>

<style scoped>
.p-0 :deep() {
  padding: 0px;
}
</style>
