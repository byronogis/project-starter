<!-- eslint-disable import/order -->
<script setup lang="ts">
import { ElPopover } from 'element-plus'
import type { DateModelType } from 'element-plus'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerInput from './DatePickerInput.vue'
import useDatePickerEnhanced from './useDatePickerEnhanced'

interface Props {
  modelValue: DateModelType
  popperClass: string
  placeholder: string
  type:
  | 'quarteryear'
  | 'halfyear'
}

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

const {
  popover,
  inputValue,
  inputPlaceholder,
  inputValueUpdate,
  panelTitle,
  panelItems,
  panelPrevClick,
  panelNextClick,
  panelItemClick,
  panelTitleClick,
} = useDatePickerEnhanced(props, emits)

const scopedId = inject<string>('scopedId')
const datepickerHalfQuarterYearRef = ref<any>(null)
watchEffect(() => {
  const popper = datepickerHalfQuarterYearRef.value?.popperRef?.contentRef as HTMLDivElement
  popper?.setAttribute?.(`data-v-${scopedId}`, '')
})

const InputRef = ref<InstanceType<typeof DatePickerInput> | null>(null)

watchEffect(() => {
  popover.visible = !!InputRef.value?.focus
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <ElPopover
    ref="datepickerHalfQuarterYearRef"
    :visible="popover.visible"
    :trigger="popover.trigger"
    :placement="popover.placement"
    :hide-after="popover.hideAfter"
    :transition="popover.transition"
    :popper-class="popover.popperClass"
    width="auto"
  >
    <template #reference>
      <DatePickerInput
        ref="InputRef"
        :value="inputValue"
        :placeholder="inputPlaceholder"
        @update:value="inputValueUpdate"
      />
    </template>

    <template #default>
      <DatePickerPanelWrapper
        @update:modelVisible="(status: boolean) => (popover.visible = status)"
      >
        <template #default>
          <DatePickerPanel
            :title="panelTitle"
            :items="panelItems"
            @clickPrev="panelPrevClick"
            @clickNext="panelNextClick"
            @clickItem="panelItemClick"
            @clickTitle="panelTitleClick"
          />
        </template>
      </DatePickerPanelWrapper>
    </template>
  </ElPopover>
</template>
