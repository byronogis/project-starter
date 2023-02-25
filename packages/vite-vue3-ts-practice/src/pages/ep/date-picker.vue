<script setup lang="ts">
const halfyear = ref('')
const quarteryear = ref('')

const halfyearrange = ref(['', ''])
const quarteryearrange = ref(['3', '4'])

const month = ref('')
const monthrange = ref('')
</script>

<template>
  <div>半年度选择器:</div>
  <DatePickerEnhanced
    v-model="halfyear"
    type="halfyear"
    placeholder="选择半年度"
  />
  <hr>

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
    placeholder-start="半年度开始"
    placeholder-end="半年度结束"
  />

  <div>季度范围</div>
  <DatePickerEnhanced
    v-model="quarteryearrange"
    type="quarteryearrange"
    placeholder-start="季度开始"
    placeholder-end="季度结束"
    separator="至"
  />

  <div>月度选择器:</div>
  <DatePickerEnhanced
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
