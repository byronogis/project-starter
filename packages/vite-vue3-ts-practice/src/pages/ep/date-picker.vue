<script setup lang="ts">
const halfyear = ref('')
const month = ref('')
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
    v-model="month"
    type="quarteryear"
  />
</template>
