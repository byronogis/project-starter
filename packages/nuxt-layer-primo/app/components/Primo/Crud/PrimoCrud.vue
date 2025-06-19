<script setup lang="ts" generic="
  D extends object,
  G extends string = never
"
>
import type {
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTablePageEvent,
} from 'primevue/datatable'
import { NuxtIcon } from '#components'
import { FilterMatchMode } from '@primevue/core/api'
import PrimoForm from '../Form/PrimoForm.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  /**
   * 主体数据的唯一标识字段
   * @default 'id'
   */
  itemId?: keyof D
  /**
   * 主体数据的标签字段
   * @default 'label'
   */
  itemLabel?: keyof D
  /**
   * 主体数据的别名
   * @default 'item'
   */
  itemAlias?: string
  /**
   * 主体数据
   * @default []
   */
  items?: D[]
  /**
   * 表单字段组信息
   */
  formGroups?: PrimoFormGroups<D, G>
  /**
   * 表单字段信息
   */
  formFields?:
    | Partial<PrimoFormFields<D, G>>
  /**
   * 起始页码
   * @default 1
   */
  pageNoFirst?: 0 | 1
  /**
   * 提交时调用的函数
   * @param items
   * @param update 是否为编辑(更改)
   */
  submitFn?: (items: Partial<D>[], update?: boolean) => Promise<void>
  /**
   * (单条/多条) 删除时调用的函数
   * @param items
   */
  deleteFn?: (items: D[]) => Promise<void>
  /**
   * 自定义全局过滤处理函数
   */
  globalFilterFn?: (val: string | undefined) => void
  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean
  /**
   * 是否禁用删除
   * @default false
   */
  disableDelete?: boolean
  /**
   * 是否禁用多条删除
   * @default true
   */
  disabledMultiDelete?: boolean
  /**
   * 是否禁用编辑
   * @default false
   */
  disableEdit?: boolean
  /**
   * 是否禁用新增
   * @default false
   */
  disableAdd?: boolean
  /**
   * 是否禁用导出
   * @default true
   */
  disableExport?: boolean
  /**
   * 是否禁用多选
   * @default true
   */
  disableMultiSelect?: boolean
  /**
   * 是否禁用展开
   * @default true
   */
  disableExpander?: boolean
  /**
   * 是否禁用全局搜索(过滤)
   * @default true
   */
  disableGlobalFilter?: boolean
  /**
   * 是否禁用头部工具栏
   * @default false
   */
  disableHeaderActionBar?: boolean
  /**
   * 是否禁用操作列
   * @default false
   */
  disableActionsColumn?: boolean
}>(), {
  itemId: 'id' as keyof D,
  itemLabel: 'label' as keyof D,
  itemAlias: 'item',
  items: () => [],
  formFields: () => ({}),
  pageNoFirst: 1,
  loading: false,
  disableDelete: false,
  disabledMultiDelete: true,
  disableEdit: false,
  disableAdd: false,
  disableExport: true,
  disableMultiSelect: true,
  disableExpander: true,
  disableGlobalFilter: true,
  disableHeaderActionBar: false,
  disableActionsColumn: false,
})

/**
 * 工具
 */
const primoCrudLogger = Utils.loggerWithTime().withTag(`PrimoCrud`).withTag(`${Utils._.upperFirst(props.itemAlias)}`)

const toast = usePrimoToast()
const dialog = usePrimoDialog()

/**
 * 分页 \
 */
const pagination = defineModel<{
  pageSize: number
  pageNo: number
}>('pagination', {
  default: () => ({
    pageSize: 10,
    // pageNo: props.pageNoFirst,
  }),
})
// NOTE 由于不可直接使用 props.pageNoFirst, 所以使用 watch 来初始化
watch(() => props.pageNoFirst, () => {
  pagination.value.pageNo = props.pageNoFirst
}, {
  once: true,
  immediate: true,
})

function handlePage(e: DataTablePageEvent) {
  pagination.value = {
    pageSize: e.rows,
    pageNo: e.page + 1,
  }
}

/**
 * 数据过滤器
 * TODO 目前使用时必须传入 filters (哪怕为空对象), 否则默认的全局搜索(过滤)将不会生效
 */
const filters = defineModel<DataTableFilterMeta & {
  /**
   * 全局搜索(过滤)
   * @default { value: null, matchMode: FilterMatchMode.CONTAINS }
   */
  global?: DataTableFilterMetaData
}>('filters', {
  default: () => ({
    // ...
  }),
})
// 确保全局搜索(过滤)初始化成功
watch(() => filters.value.global, (_val) => {
  if (!_val) {
    filters.value.global = { value: null, matchMode: FilterMatchMode.CONTAINS }
  }
}, { immediate: true, once: true })
// 全局搜索(过滤)处理
function handleGlobalFilter(val: string | undefined) {
  if (props.disableGlobalFilter) {
    return
  }

  if (props.globalFilterFn) {
    props.globalFilterFn(val)
    return
  }

  filters.value.global!.value = val
}

/**
 * 表单字段信息
 */
// const primoFormRef = ref<ComponentExposed<typeof PrimoForm>>()
const {
  context,
  groupList,
  forceResetFormValues,
} = usePrimoForm<
  D,
  G
>({
  fields: () => props.formFields,
  groups: () => props.formGroups,
  identify: `primo-crud-${props.itemAlias}`,
  onFieldResolved: (field) => {
    return {
      ...field,
      extra: {
        gridArea: Utils.sanitizeString({ source: field.fieldPath }),
        ...field.extra,
      },
    }
  },
})

/**
 * 新增/编辑
 */
const showItemDialog = ref(false)
const isSaving = ref(false)

// TODO 考虑增加详情需要额外获取的情况
function editItem(_item: D) {
  context.setValues(JSON.parse(JSON.stringify(_item)))
  showItemDialog.value = true
}

async function saveItem() {
  const _item = context.values
  // @ts-expect-error UnwrapRef<D>
  const hasId = props.itemId in _item && _item[props.itemId]

  // @ts-expect-error UnwrapRef<D>
  primoCrudLogger.withTag(`saveItem`).log({ ..._item })

  try {
    isSaving.value = true

    const { valid } = await context.validate()
    if (!valid) {
      throw new Error('Validation Error')
    }

    if (hasId) {
      await props.submitFn?.([_item] as D[], true)
      toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Updated`)
    }
    else {
      await props.submitFn?.([_item] as D[])
      toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Created`)
    }

    showItemDialog.value = false
  }
  catch (error: any) {
    toast.toastError(String(error?.message))
    primoCrudLogger.withTag(`saveItem`).error(error?.message)
  }
  finally {
    isSaving.value = false
  }
}

/**
 * 删除
 */
const selectedItems = ref<D[]>()

function confirmDeleteSelected() {
  dialog.dialogConfirm({
    header: 'Confirm',
    message: h('div', { class: 'flex items-center gap-4' }, [
      h(NuxtIcon, { name: 'i-prime:exclamation-triangle', class: '!text-3xl' }),
      h('span', null, 'Are you sure you want to delete the selected items?'),
    ]),
    async confirmFn() {
      try {
        await baseDeleteItems(selectedItems.value ?? [])
        selectedItems.value = undefined
        toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)}s Deleted`)
      }
      catch (error: any) {
        toast.toastError(String(error?.message))
        primoCrudLogger.withTag(`deleteSelectedItems`).error(error?.message)
      }
    },
  })
}

function confirmDeleteItem(_item: D) {
  dialog.dialogConfirm({
    header: 'Confirm',
    message: h('div', { class: 'flex items-center gap-4' }, [
      h(NuxtIcon, { name: 'i-prime:exclamation-triangle', class: '!text-3xl' }),
      h('span', null, [
        'Are you sure you want to delete ',
        h('b', null, `${_item[props.itemLabel!]}`),
        '?',
      ]),
    ]),
    async confirmFn() {
      try {
        await baseDeleteItems([_item])
        toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Deleted`)
      }
      catch (error: any) {
        toast.toastError(String(error?.message))
        primoCrudLogger.withTag(`deleteItem`).error(error?.message)
      }
    },
  })
}

// base
async function baseDeleteItems(items: D[]) {
  primoCrudLogger.withTag(`baseDeleteItems`).log(items)

  await props.deleteFn?.(items)
}

/**
 * 表格
 */
const dataTableRef = ref()
const dataTableProps = ref({
  dataKey: props.itemId,
  paginator: true,
  filterDisplay: 'menu' as const,
  paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
  rowsPerPageOptions: [5, 10, 25],
  currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords} items',
  removableSort: true,
  rowHover: true,
  scrollable: true,
})

/**
 * 导出 CSV
 */
function exportCSV() {
  dataTableRef.value.exportCSV()
}

/**
 * 关闭弹窗时重置表单
 */
watch([showItemDialog], ([_item]) => {
  if (!_item) {
    forceResetFormValues()
  }
})

defineExpose({
  // @ts-expect-error UnwrapRef<D>
  isUpdating: computed(() => !!context.values[props.itemId]),
})
</script>

<template>
  <div class="component-primo-crud card">
    <PrimoCrudToolbar
      v-if="!props.disableHeaderActionBar"
      :is-checked="!!selectedItems?.length"
      :disable-add
      :disabled-multi-delete
      :disable-export
      :disable-global-filter
      @add="showItemDialog = true"
      @delete-checked="confirmDeleteSelected"
      @export="exportCSV"
      @global-filte="handleGlobalFilter"
    >
      <template #extra>
        <h4 class="order--2 h-12 text-6 font-500 leading-12">
          {{ Utils._.upperFirst(props.itemAlias) }}
        </h4>

        <i class="order--1 flex-1" />
      </template>
    </PrimoCrudToolbar>

    <PrimeDataTable
      ref="dataTableRef"
      v-model:selection="selectedItems"
      v-model:filters="filters"
      v-bind="{
        ...dataTableProps,
        value: props.items,
        loading: props.loading,
        first: (pagination.pageNo - props.pageNoFirst) * pagination.pageSize,
        rows: pagination.pageSize,
        ...($attrs?.['data-table-props'] ?? {}),
      }"
      @page="handlePage"
    >
      <!-- TODO props -->
      <PrimeColumn
        v-if="!props.disableMultiSelect"
        selection-mode="multiple"
        style="width: 3rem"
        :exportable="false"
        frozen
      />

      <PrimeColumn
        v-if="!props.disableExpander"
        frozen
        expander
        style="width: 5rem"
        :exportable="false"
      />

      <slot name="columns">
        <!-- Column -->
      </slot>

      <!-- TODO props -->
      <PrimeColumn
        v-if="!props.disableActionsColumn"
        :exportable="false"
        frozen
        align-frozen="right"
        class="space-x-2"
      >
        <template #body="slotProps">
          <PrimeButton
            v-if="!props.disableEdit"
            outlined
            rounded
            @click="editItem(slotProps.data)"
          >
            <template #icon>
              <NuxtIcon name="i-prime:pencil" />
            </template>
          </PrimeButton>
          <PrimeButton
            v-if="!props.disableDelete"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteItem(slotProps.data)"
          >
            <template #icon>
              <NuxtIcon name="i-prime:trash" />
            </template>
          </PrimeButton>

          <slot name="action-extra" :item="(slotProps.data as D)" />
        </template>
      </PrimeColumn>

      <!-- TODO pref v-for $slot -->
      <template #expansion="slotProps">
        <slot name="expansion" v-bind="slotProps" />
      </template>
    </PrimeDataTable>

    <PrimeDialog
      v-model:visible="showItemDialog"
      :style="{ width: 'clamp(450px, 80vw, 1200px)' }"
      :header="`${Utils._.upperFirst(props.itemAlias)} Details`"
      :modal="true"
      append-to="self"
    >
      <template #default>
        <PrimoForm
          :group-list="(groupList as any)"
        />
      </template>

      <template #footer>
        <PrimeButton label="Cancel" text @click="showItemDialog = false">
          <template #icon>
            <NuxtIcon name="i-prime:times" />
          </template>
        </PrimeButton>
        <PrimeButton label="Save" :loading="isSaving" @click="saveItem">
          <template #icon>
            <NuxtIcon name="i-prime:check" />
          </template>
        </PrimeButton>
      </template>
    </PrimeDialog>
  </div>
</template>

<style scoped lang="postcss"></style>
