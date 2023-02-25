<script setup lang="ts">
const emits = defineEmits(['update:popoverVisible'])
</script>

<template>
  <div
    tabindex="0"
    class="el-picker-panel el-date-picker"
    @focus="emits('update:popoverVisible', true)"
    @blur="emits('update:popoverVisible', false)"
  >
    <div class="el-picker-panel__body-wrapper">
      <div class="el-picker-panel__body">
        <!-- content -->
        <slot />
      </div>
    </div>
  </div>
</template>
