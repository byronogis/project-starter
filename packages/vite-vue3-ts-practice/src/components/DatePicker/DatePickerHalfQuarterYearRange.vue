<!-- eslint-disable unused-imports/no-unused-imports -->
<script setup lang="ts">
// import DatePickerHalfQuarterYear from './DatePickerHalfQuarterYear.vue'
import { Calendar, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import DatePickerHalfQuarterYearPanelWrapper from './DatePickerHalfQuarterYearPanelWrapper.vue'
import DatePickerHalfQuarterYearPanel from './DatePickerHalfQuarterYearPanel.vue'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'
import type { ViewItem } from './types'

const props = defineProps<{
  type: 'quarteryearrange' | 'halfyearrange'
}>()
const attrs = useAttrs()

const quarteryearEnum = ['一', '二', '三', '四']
const halfyearEnum = ['上', '下']

const popover = reactive({
  trigger: 'click',
  placement: 'bottom',
  hideAfter: 0,
  transition: 'el-zoom-in-top',
  visible: false,
  popperClass: [attrs['popper-class'], 'el-picker__popper'],
})

const input = reactive({
  modelValue: '',
  placeholder: '选择月份',
  clearable: true,
  size: 'default',
  readonly: false,
  editable: true,
  disabled: false,
})

const setInputModelValue = (val: any) => {
  input.modelValue = val
}

const datepicker = reactive({
  data: [0, 0], /// 年度, 季度/半年度
  // valueFormat: 'yyyy-qq',

  viewPanel: 'year', // 'quarteryear' | 'halfyear' | 'year'
  viewYear: new Date().getFullYear(),
  viewItems: [] as ViewItem[],
})

const datepicker_isYearViewPanel = computed(() => datepicker.viewPanel === 'year')
const datepicker_startYear = computed(() => Math.floor(datepicker.viewYear / 10) * 10)
const datepicker_viewLines = computed(() => Math.ceil(datepicker.viewItems.length / 4))
const datepicker_viewTitle = computed(() => {
  let res
  switch (datepicker.viewPanel) {
    case 'year':
      res = `${datepicker_startYear.value} - ${datepicker_startYear.value + 9}`
      break
    default:
      res = `${datepicker.viewYear}`
      break
  }

  return res
})

const datepicker_clickPrev = () => {
  datepicker_isYearViewPanel.value
    ? datepicker.viewYear -= 10
    : datepicker.viewYear--

  initView()
}
const datepicker_clickNext = () => {
  datepicker_isYearViewPanel.value
    ? datepicker.viewYear += 10
    : datepicker.viewYear++

  initView()
}
const datepicker_clickViewTitle = () => {
  if (datepicker_isYearViewPanel.value) {
    return
  }

  datepicker.viewPanel = 'year'
}
const datepicker_clickViewItem = (viewItem: ViewItem) => {
  console.log('点击了: ', viewItem)

  if (viewItem.disabled) {
    return
  }

  if (datepicker_isYearViewPanel.value) {
    datepicker.viewYear = viewItem.year
    datepicker.viewPanel = props.type
  } else {
    datepicker.data = [viewItem.year, viewItem[props.type] as number]
    popover.visible = false
  }
}

// 生成视图数据
function initView() {
  let list: ViewItem[]

  const curDate = new Date()
  const curYear = curDate.getFullYear()
  const curMonth = curDate.getMonth() + 1
  const curQuarterYear = Math.ceil(curMonth / 3)
  const curHalfYear = Math.ceil(curMonth / 6)

  if (datepicker.viewPanel === 'quarteryear') { // 季度
    list = quarteryearEnum.map((cur, idx): ViewItem => {
      const year = datepicker.viewYear
      const quarteryear = idx + 1

      return {
        label: `第${cur}季度`,
        year,
        quarteryear,
        current: (year === curYear) && (quarteryear === curQuarterYear),
        active: (year === datepicker.data[0]) && (quarteryear === datepicker.data[1]),
      }
    })
  } else if (datepicker.viewPanel === 'halfyear') { // 半年度
    list = halfyearEnum.map((cur, idx): ViewItem => {
      const year = datepicker.viewYear
      const halfyear = idx + 1

      return {
        label: `${cur}半年`,
        year,
        halfyear,
        current: (year === curYear) && (halfyear === curHalfYear),
        active: (year === datepicker.data[0]) && (halfyear === datepicker.data[1]),
      }
    })
  } else if (datepicker.viewPanel === 'year') { // 年度
    // datepicker.viewYear = datepicker_startYear.value
    list = Array(10).fill(1).map((cur, idx): ViewItem => {
      const year = datepicker_startYear.value + idx

      return {
        label: `${year}`,
        year,
        current: year === curYear,
        active: year === datepicker.data[0],
      }
    })
  } else {
    list = []
  }

  datepicker.viewItems = list
}

// 日期面板类型改变重新生成日期项目
watch(() => datepicker.viewPanel, () => {
  initView()
})

// 日期改变设置输入框值
watch(() => datepicker.data, (newV, oldV) => {
  console.log('改变了日期 new old: ', newV, oldV)
  input.modelValue = datepicker.data.join('-')

  // 重新生成面板项目,主要为了刷新状态
  initView()
})

initView()
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
    <!--  -->
    <template #default>
      <DatePickerHalfQuarterYearPanelWrapper
        @update:popover-visible="(status: boolean) => popover.visible = status"
      >
        <template #default>
          <!-- left -->
          <DatePickerHalfQuarterYearPanel
            :datepicker_view-title="datepicker_viewTitle"
            :datepicker_view-lines="datepicker_viewLines"
            :datepicker_view-items="datepicker.viewItems"
            @datepicker_click-prev="datepicker_clickPrev"
            @datepicker_click-next="datepicker_clickNext"
            @datepicker_click-view-title="datepicker_clickViewTitle"
            @datepicker_click-view-item="datepicker_clickViewItem"
          />

          <!-- right -->
          <DatePickerHalfQuarterYearPanel
            :datepicker_view-title="datepicker_viewTitle"
            :datepicker_view-lines="datepicker_viewLines"
            :datepicker_view-items="datepicker.viewItems"
            @datepicker_click-prev="datepicker_clickPrev"
            @datepicker_click-next="datepicker_clickNext"
            @datepicker_click-view-title="datepicker_clickViewTitle"
            @datepicker_click-view-item="datepicker_clickViewItem"
          />
        </template>
      </DatePickerHalfQuarterYearPanelWrapper>
    </template>
  </el-popover>
</template>
