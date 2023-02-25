<script setup lang="ts">
const emits = defineEmits(['update:popoverVisible'])
</script>

<template>
  <div
    tabindex="0"
    class="el-picker-panel el-date-picker"
    @focusin="emits('update:popoverVisible', true)"
    @focusout="emits('update:popoverVisible', false)"
  >
    <div class="el-picker-panel__body-wrapper">
      <div class="el-picker-panel__body">
        <!-- content -->
        <slot />
      </div>
    </div>
  </div>
</template>
