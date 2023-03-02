<!-- eslint-disable import/order -->
<script setup lang="ts">
import { ElPopover } from 'element-plus'
import type { DateModelType } from 'element-plus'
import DatePickerPanelWrapper from './DatePickerPanelWrapper.vue'
import DatePickerPanel from './DatePickerPanel.vue'
import DatePickerInputRange from './DatePickerInputRange.vue'
import useDatePickerEnhancedRange from './useDatePickerEnhancedRange'

interface Props {
  modelValue: [DateModelType, DateModelType]
  popperClass: string
  startPlaceholder: string
  endPlaceholder: string
  rangeSeparator: string
  type:
  | 'quarteryearrange'
  | 'halfyearrange'
}

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

// const attrs = useAttrs()

const {
  popover,
  inputValue,
  inputStartPlaceholder,
  inputValueUpdate,
  panelTitle,
  panelItems,
  panelPrevClick,
  panelNextClick,
  panelItemClick,
  panelTitleClick,
} = useDatePickerEnhancedRange(props, emits, 0)

const {
  // popover: popoverSecond, // 实际就是上面的
  inputValue: inputValueSecond,
  inputEndPlaceholder,
  inputValueUpdate: inputValueUpdateSecond,
  panelTitle: panelTitleSecond,
  panelItems: panelItemsSecond,
  panelPrevClick: panelPrevClickSecond,
  panelNextClick: panelNextClickSecond,
  panelItemClick: panelItemClickSecond,
  panelTitleClick: panelTitleClickSecond,
} = useDatePickerEnhancedRange(props, emits, 1, popover)

const scopedId: any = inject('scopedId')
const datepickerHalfQuarterYearRangeRef = ref<any>(null)
watchEffect(() => {
  const popper = datepickerHalfQuarterYearRangeRef.value?.popperRef?.contentRef as HTMLDivElement
  popper?.setAttribute?.(`${String(scopedId.value)}`, '')
})

const InputRef = ref<InstanceType<typeof DatePickerInputRange> | null>(null)

watchEffect(() => {
  const startFocus = !!InputRef.value?.startFocus
  const endFocus = !!InputRef.value?.endFocus
  popover.visible = startFocus || endFocus
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <ElPopover
    ref="datepickerHalfQuarterYearRangeRef"
    :visible="popover.visible"
    :trigger="popover.trigger"
    :placement="popover.placement"
    :hide-after="popover.hideAfter"
    :transition="popover.transition"
    :popper-class="popover.popperClass"
    width="auto"
  >
    <!--  -->
    <template #reference>
      <DatePickerInputRange
        ref="InputRef"
        value=""
        placeholder=""
        :start-value="inputValue"
        :end-value="inputValueSecond"
        :start-placeholder="inputStartPlaceholder"
        :end-placeholder="inputEndPlaceholder"
        :range-separator="props.rangeSeparator"
        @update:startValue="inputValueUpdate"
        @update:endValue="inputValueUpdateSecond"
      />
    </template>
    <!--  -->
    <template #default>
      <DatePickerPanelWrapper
        is-range
        @update:modelVisible="(status: boolean) => popover.visible = status"
      >
        <template #range-left>
          <!-- left -->
          <DatePickerPanel
            class="el-date-range-picker__content is-left p-0"
            :title="panelTitle"
            :items="panelItems"
            @clickPrev="panelPrevClick"
            @clickNext="panelNextClick"
            @clickItem="panelItemClick"
            @clickTitle="panelTitleClick"
          />
        </template>

        <template #range-right>
          <!-- right -->
          <DatePickerPanel
            class="el-date-range-picker__content is-right p-0"
            :title="panelTitleSecond"
            :items="panelItemsSecond"
            @clickPrev="panelPrevClickSecond"
            @clickNext="panelNextClickSecond"
            @clickItem="panelItemClickSecond"
            @clickTitle="panelTitleClickSecond"
          />
        </template>
      </DatePickerPanelWrapper>
    </template>
  </ElPopover>
</template>
