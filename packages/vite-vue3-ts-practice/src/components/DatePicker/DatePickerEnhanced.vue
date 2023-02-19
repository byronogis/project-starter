<script setup lang="ts">
import DatePickerrHalfQuarterYear from './DatePickerrHalfQuarterYear.vue'

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
</script>

<template>
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
      :type="2"
    />
  </template>

  <!-- 季度 -->
  <template v-else-if="props.type === 'quarteryear'">
    <DatePickerrHalfQuarterYear
      v-bind="$attrs"
      :type="1"
    />
  </template>
</template>
