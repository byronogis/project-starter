<script setup lang="ts">
// 基于 See https://blog.csdn.net/qq1370151551/article/details/118811216
import { Calendar, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'

interface ViewItem {
  label: string
  year: number
  quarteryear?: number
  halfyear?: number
  current: boolean
  active: boolean
  disabled?: boolean
}

const props = defineProps<{
  type: 'quarteryear' | 'halfyear'
}>()
const attrs = useAttrs()

const quarteryearEnum = ['一', '二', '三', '四']
const halfyearEnum = ['上', '下']

// v-bind=
const popover = reactive({
  trigger: 'click',
  placement: 'bottom',
  hideAfter: 0,
  transition: 'el-zoom-in-top',
  modelVisible: false,
  popperClass: [attrs['popper-class']],
})

// v-bind=
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
    popover.modelVisible = false
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
    v-model:visible="popover.modelVisible"
    :trigger="popover.trigger"
    :placement="popover.placement"
    :hide-after="popover.hideAfter"
    :transition="popover.transition"
    :popper-class="[popover.popperClass, 'el-picker__popper']"
    width="auto"
  >
    <template #reference>
      <el-input
        class="el-date-editor el-date-editor--month"
        v-bind="input"
        :prefix-icon="Calendar"
        @update:modelValue="setInputModelValue"
      />
    </template>

    <template #default>
      <div class="el-picker-panel el-date-picker">
        <div class="el-picker-panel__body-wrapper">
          <div class="el-picker-panel__body">
            <!-- header -->
            <div class="el-date-picker__header el-date-picker__header--bordered">
              <span class="el-date-picker__prev-btn">
                <button
                  type="button"
                  aria-label="上一年"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                  @click="datepicker_clickPrev"
                ><el-icon><DArrowLeft /></el-icon></button>
              </span>
              <span role="button" class="el-date-picker__header-label" @click="datepicker_clickViewTitle">{{ datepicker_viewTitle }}</span>
              <span class="el-date-picker__next-btn">
                <button
                  type="button"
                  aria-label="下一年"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                  @click="datepicker_clickNext"
                ><el-icon><DArrowRight /></el-icon></button>
              </span>
            </div>
            <!-- content -->
            <div class="el-picker-panel__content">
              <table class="el-month-table" style="">
                <tbody>
                  <tr v-for="line in datepicker_viewLines" :key="line">
                    <template
                      v-for="item in datepicker.viewItems.slice((line - 1) * 4, (line - 1) * 4 + 4)"
                      :key="item.label"
                    >
                      <td
                        v-if="item"
                        :class="{
                          today: item.current,
                          current: item.active,
                          disabled: item.disabled,
                        }"
                      >
                        <div>
                          <span
                            class="cell"
                            @click="datepicker_clickViewItem(item)"
                          >{{ item.label }}</span>
                        </div>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-popover>
</template>
