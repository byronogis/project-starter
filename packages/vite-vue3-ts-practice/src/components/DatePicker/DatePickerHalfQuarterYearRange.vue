<script setup lang="ts">
// import DatePickerHalfQuarterYear from './DatePickerHalfQuarterYear.vue'
const input = ref('')
const input2 = ref('')
</script>

<template>
  <el-popover>
    <!--  -->
    <template #reference>
      <DatePickerRangeInput />
    </template>
  </el-popover>
</template>
