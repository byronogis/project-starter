<script setup lang="ts">
// eslint-disable-next-line unused-imports/no-unused-imports
import { Calendar, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/calendar/style/css'
import type { ViewItem } from './types'

const props = defineProps<{
  datepicker_viewTitle: string
  datepicker_viewLines: number
  datepicker_viewItems: ViewItem[]
}>()

const emits = defineEmits([
  'datepicker_clickPrev',
  'datepicker_clickNext',
  'datepicker_clickViewTitle',
  'datepicker_clickViewItem',
])
</script>

<template>
  <div class="el-picker-panel el-date-picker">
    <div class="el-picker-panel__body-wrapper">
      <div class="el-picker-panel__body">
        <!-- content -->
        <div class="el-picker-panel__content">
          <!-- header -->
          <div class="el-date-picker__header el-date-picker__header--bordered">
            <span class="el-date-picker__prev-btn">
              <button
                type="button"
                aria-label="上一年"
                class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                @click="emits('datepicker_clickPrev')"
              ><el-icon><DArrowLeft /></el-icon></button>
            </span>
            <span role="button" class="el-date-picker__header-label" @click="emits('datepicker_clickViewTitle')">{{ props.datepicker_viewTitle }}</span>
            <span class="el-date-picker__next-btn">
              <button
                type="button"
                aria-label="下一年"
                class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                @click="emits('datepicker_clickNext')"
              ><el-icon><DArrowRight /></el-icon></button>
            </span>
          </div>
          <!-- table -->
          <table class="el-month-table" style="">
            <tbody>
              <tr v-for="line in datepicker_viewLines" :key="line">
                <template
                  v-for="item in props.datepicker_viewItems.slice((line - 1) * 4, (line - 1) * 4 + 4)"
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
                        @click="emits('datepicker_clickViewItem', item)"
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
