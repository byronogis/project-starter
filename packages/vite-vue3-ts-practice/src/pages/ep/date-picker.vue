<script setup lang="ts">
const halfyear = ref('')
const quarteryear = ref('')
const month = ref('')
const monthrange = ref('')
</script>

<template>
  <div>半年度选择器:</div>
  <DatePickerEnhanced
    v-model="halfyear"
    type="halfyear"
  />
  <hr>

  <div>季度选择器:</div>
  <DatePickerEnhanced
    v-model="quarteryear"
    type="quarteryear"
  />

  <div>月度选择器:</div>
  <DatePickerEnhanced
    v-model="month"
    type="month"
  />

  <div>DatePickerHalfQuarterYearRange</div>
  <DatePickerHalfQuarterYearRange type="quarteryearrange" />

  <div>月度范围选择</div>
  <el-date-picker
    v-model="monthrange"
    type="monthrange"
    range-separator="To"
    start-placeholder="Start month"
    end-placeholder="End month"
  />
</template>
