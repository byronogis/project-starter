<script setup lang="ts">
const props = defineProps<{
  isRange?: boolean
}>()

const emits = defineEmits(['update:popoverVisible'])

const isRange = toRef(props, 'isRange')
</script>

<template>
  <div
    tabindex="0"
    class="el-picker-panel"
    :class="!isRange ? 'el-date-picker' : 'el-date-range-picker'"
    @focus="emits('update:popoverVisible', true)"
    @blur="emits('update:popoverVisible', false)"
  >
    <div class="el-picker-panel__body-wrapper">
      <div class="el-picker-panel__body">
        <!-- content -->
        <template v-if="isRange">
          <slot name="range-left" />

          <slot name="range-right" />
        </template>

        <template v-else>
          <slot name="default" />
        </template>
      </div>
    </div>
  </div>
</template>
