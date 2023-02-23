<script setup lang="ts">
// 基于 See https://blog.csdn.net/qq1370151551/article/details/118811216
import { Calendar, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import 'element-plus/es/components/calendar/style/css'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/date-picker/style/css'

interface ViewItem {
  label: string
  year: number
  quarter?: number
  half?: number
  current: boolean
  active: boolean
}

const props = defineProps<{
  type: 'quarteryear' | 'halfyear'
}>()
const attrs = useAttrs()

const quarteryearEnum = ['一', '二', '三', '四']
const halfyearEnum = ['上', '下']

const popover = reactive({
  trigger: 'click',
  placement: 'bottom',
  hideAfter: 0,
  transition: 'el-zoom-in-top',
  modelVisible: false,
  popperClass: [attrs['popper-class']],
})

const input = reactive({
  modelValue: '',
  placeholder: '',
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
  valueFormat: 'yyyy-qq',

  viewPanel: 'year', // 'quarteryear' | 'halfyear' | 'year'
  viewYear: new Date().getFullYear(),
  viewItems: [] as ViewItem[],
})

const datepicker_startYear = computed(() => Math.floor(datepicker.viewYear / 10) * 10)
const datepicker_viewLines = computed(() => Math.ceil(datepicker.viewItems.length / 4))
const datepicker_viewTitle = computed(() => {
  let res
  switch (datepicker.viewPanel) {
    case 'quarteryear':
      res = `${datepicker.viewYear} 年`
      break
    case 'halfyear':
      res = `${datepicker.viewYear} 年`
      break
    case 'year':
      res = `${datepicker_startYear.value} 年 - ${datepicker_startYear.value + 9} 年`
      break
    default:
      break
  }

  return res
})

const datepicker_clickPrev = () => {
  if (['quarteryear', 'halfyear'].includes(datepicker.viewPanel)) {
    datepicker.viewYear--
    initView()
  } else if (['year'].includes(datepicker.viewPanel)) {
    datepicker.viewYear -= 10
    initView()
  }
}
const datepicker_clickNext = () => {
  if (['quarteryear', 'halfyear'].includes(datepicker.viewPanel)) {
    datepicker.viewYear++
    initView()
  } else if (['year'].includes(datepicker.viewPanel)) {
    datepicker.viewYear += 10
    initView()
  }
}
const datepicker_clickViewTitle = () => {
  if (datepicker.viewPanel !== 'year') {
    datepicker.viewPanel = 'year'
  }
}
const datepicker_clickViewItem = ({ year, half, quarter }: ViewItem) => {
  console.log(year, half, quarter)
  if (['quarteryear', 'halfyear'].includes(datepicker.viewPanel)) {
    if (datepicker.viewPanel === 'quarteryear') {
      datepicker.data = [year, quarter as number]
    } else { // 'halfyear'
      datepicker.data = [year, half as number]
    }
    popover.modelVisible = false
    input.modelValue = datepicker.data.join('-')
  } else { // 'year'
    datepicker.viewYear = year
    datepicker.viewPanel = props.type
  }
}

// 生成视图数据
function initView() {
  let list: ViewItem[]

  const curDate = new Date()
  const curYear = curDate.getFullYear()
  const curMonth = curDate.getMonth() + 1
  const curQuarter = Math.ceil(curMonth / 3)
  const curHalf = Math.ceil(curMonth / 6)

  if (datepicker.viewPanel === 'quarteryear') { // 季度
    list = quarteryearEnum.reduce((acc, cur, idx) => {
      const year = datepicker.viewYear

      acc.push({
        label: `第${cur}季度`,
        year,
        quarter: idx + 1,
        current: year === curYear && (idx + 1) === curQuarter,
        active: year === datepicker.data[0] && (idx + 1) === datepicker.data[1],
      })

      return acc
    }, [] as ViewItem[])
  } else if (datepicker.viewPanel === 'halfyear') { // 半年度
    list = halfyearEnum.reduce((acc, cur, idx) => {
      const year = datepicker.viewYear

      acc.push({
        label: `${cur}半年`,
        year,
        half: idx + 1,
        current: year === curYear && (idx + 1) === curHalf,
        active: year === datepicker.data[0] && (idx + 1) === datepicker.data[1],
      })

      return acc
    }, [] as ViewItem[])
  } else if (datepicker.viewPanel === 'year') { // 年度
    datepicker.viewYear = datepicker_startYear.value

    list = Array(10).fill(1).reduce((acc, _cur, idx) => {
      const year = datepicker_startYear.value + idx

      acc.push({
        label: `${year}`,
        year,
        current: year === curYear,
        active: year === datepicker.data[0],
      })
      return acc
    }, [] as ViewItem[])
  } else {
    list = []
  }

  datepicker.viewItems = list
}

watch(() => props.type, () => {
  datepicker.viewPanel = props.type
})

watch(() => datepicker.viewPanel, () => {
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
    :popper-class="popover.popperClass"
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
      <div class="el-date-picker">
        <div class="el-picker-panel__body-wrapper">
          <div class="el-picker-panel__body">
            <!-- header -->
            <div class="el-date-picker__header el-date-picker__header--bordered" style="margin:0px; line-height:30px">
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
            <div class="el-picker-panel__content" style="margin:0px; width:100%">
              <table class="el-month-table" style="">
                <tbody>
                  <tr v-for="line in datepicker_viewLines" :key="line">
                    <td v-for="index in (line * 4 <= datepicker.viewItems.length ? 4 : datepicker.viewItems.length - (line - 1) * 4)" :key="index" :class="{ today: datepicker.viewItems[(line - 1) * 4 + index - 1]?.current, current: datepicker.viewItems[(line - 1) * 4 + index - 1]?.active }">
                      <div><a class="cell" @click="datepicker_clickViewItem(datepicker.viewItems[(line - 1) * 4 + index - 1])">{{ datepicker.viewItems[(line - 1) * 4 + index - 1]?.label }}</a></div>
                    </td>
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
