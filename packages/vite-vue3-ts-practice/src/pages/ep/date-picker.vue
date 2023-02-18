<script setup lang="ts">
const month = ref('')
</script>

<template>
  <div class="pages_ep_date-picker">
    <el-date-picker
      v-model="month"
      type="month"
      placeholder="Pick a month"
    />
  </div>
</template>
