<script setup lang="ts">
const halfyear = ref('2021-05-01')
const quarteryear = ref('2023-10-01')

const halfyearrange = ref<[string, string]>(['2021-05-01', '2023-10-01'])
const quarteryearrange = ref<[string, string]>(['2021-05-01', '2023-10-01'])

const month = ref('2021-06-01')
const monthrange = ref(['2021-07-01', '2021-09-01'])
</script>

<template>
  <div>半年度选择器:</div>
  <DatePickerEnhanced
    v-model="halfyear"
    type="halfyear"
    placeholder="选择半年度"
  />

  <div>季度选择器:</div>
  <DatePickerEnhanced
    v-model="quarteryear"
    type="quarteryear"
    placeholder="选择季度"
  />

  <div>半年度范围</div>
  <DatePickerEnhanced
    v-model="halfyearrange"
    type="halfyearrange"
    start-placeholder="半年度开始"
    end-placeholder="半年度结束"
  />

  <div>季度范围</div>
  <DatePickerEnhanced
    v-model="quarteryearrange"
    type="quarteryearrange"
    start-placeholder="季度开始"
    end-placeholder="季度结束"
    range-separator="To"
  />

  <div>月度选择器:</div>
  <el-date-picker
    v-model="month"
    type="month"
  />

  <div>月度范围选择</div>
  <el-date-picker
    v-model="monthrange"
    type="monthrange"
    range-separator="To"
    start-placeholder="Start month"
    end-placeholder="End month"
  />
</template>
