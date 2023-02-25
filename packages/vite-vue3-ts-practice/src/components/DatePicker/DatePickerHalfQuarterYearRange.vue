<script setup lang="ts">
// import DatePickerHalfQuarterYear from './DatePickerHalfQuarterYear.vue'
const props = defineProps<{
  type: 'quarteryearrange' | 'halfyearange'
}>()
const attrs = useAttrs()

const popover = reactive({
  trigger: 'click',
  placement: 'bottom',
  hideAfter: 0,
  transition: 'el-zoom-in-top',
  visible: false,
  popperClass: [attrs['popper-class'], 'el-picker__popper'],
})
</script>

<template>
  <el-popover
    v-bind="popover"
    width="auto"
  >
    <!--  -->
    <template #reference>
      <DatePickerRangeInput
        @update:popover-visible="(status: boolean) => popover.visible = status"
      />
    </template>
  </el-popover>
</template>
