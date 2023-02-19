<script setup lang="ts">
const halfyear = ref('')
const month = ref('')
</script>

<template>
  <DatePickerEnhanced
    v-model="halfyear"
    type="halfyear"
  />
  <hr>

  <DatePickerEnhanced
    v-model="month"
    type="month"
  />
</template>
