<script setup lang="ts" generic="T extends CrudItem, U extends CrudFormFieldsInfo<T>">
import type {
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTablePageEvent,
} from 'primevue/datatable'
import type {
  CrudFormFieldsInfo,
  CrudFormFieldsInfoGroup,
  CrudItem,
} from '../../types/crud'
import { FilterMatchMode } from '@primevue/core/api'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  /**
   * 主体数据的别名
   * @default 'item'
   */
  itemAlias?: string
  /**
   * 主体数据
   * @default []
   */
  items?: T[]
  /**
   * 表单字段信息
   */
  formFieldsInfo?: Partial<U> | CrudFormFieldsInfoGroup<T>
  /**
   * 提交时调用的函数
   * @param item
   * @param update 是否为编辑(更改)
   */
  submitFn?: (item: Partial<T>, update?: boolean) => Promise<void>
  /**
   * (单条/多条) 删除时调用的函数
   * @param items
   */
  deleteFn?: (items: T[]) => Promise<void>
  /**
   * 自定义全局过滤处理函数
   */
  globalFilterFn?: (val: string | undefined) => void
  /**
   * 包裹表单项的容器的类名
   * 1. 可用于表单非分组时的默认容器
   * 2. 可用于表单分组时的默认分组
   */
  formClass?: string
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
   * 是否禁用全局搜索(过滤)
   * @default true
   */
  disableGlobalFilter?: boolean
  /**
   * 是否禁用头部工具栏
   * @default false
   */
  disableHeader?: boolean
  /**
   * 是否禁用操作列
   * @default false
   */
  disableActions?: boolean
}>(), {
  itemAlias: 'item',
  items: () => [],
  formFieldsInfo: () => ({}),
  loading: false,
  disableDelete: false,
  disabledMultiDelete: true,
  disableEdit: false,
  disableAdd: false,
  disableExport: true,
  disableMultiSelect: true,
  disableGlobalFilter: true,
  disableHeader: false,
  disableActions: false,
})

/**
 * 分页 \
 * NOTE pageNo 从 1 开始计数
 */
const pagination = defineModel<{
  pageSize: number
  pageNo: number
}>('pagination', {
  default: () => ({
    pageSize: 10,
    pageNo: 1,
  }),
})

function handlePage(e: DataTablePageEvent) {
  pagination.value = {
    pageSize: e.rows,
    pageNo: e.page + 1,
  }
}

/**
 * 数据过滤器
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
 * 工具
 */
const crudLogger = Utils.logger.withTag(`Crud`).withTag(`${Utils._.upperFirst(props.itemAlias)}`)

const toast = useAppToast()

/**
 * 表单字段信息
 */
const formFieldsInfoGroup = computed<CrudFormFieldsInfoGroup<T>>(() => {
  if (!Array.isArray(props.formFieldsInfo)) {
    const _group: CrudFormFieldsInfoGroup<T> = [
      {
        title: '_default',
        formClass: props.formClass,
        fields: props.formFieldsInfo,
      },
    ]

    return _group
  }

  // TODO 可以考虑针对同名 title 的分组进行合并

  return props.formFieldsInfo
})

/**
 * 表格
 */
const dataTableRef = ref()
const dataTableProps = ref({
  dataKey: '_id',
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
 * 表单
 */
const {
  values,
  setValues,
  resetForm,
  // handleSubmit,
  // controlledValues,
  validate,

} = useForm({
  //
})

function forceResetFormValues() {
  resetForm({
    values: {},
  }, {
    force: true,
  })
}

/**
 * 新增/编辑
 */
const showItemDialog = ref(false)
const isSaving = ref(false)

function openNew() {
  showItemDialog.value = true
}

function hideItemDialog() {
  showItemDialog.value = false
}

function editItem(_item: T) {
  setValues(JSON.parse(JSON.stringify(_item)))
  showItemDialog.value = true
}

async function saveItem() {
  const _item = values
  const hasId = '_id' in values && _item._id

  crudLogger.withTag(`saveItem`).log({ ..._item })

  try {
    isSaving.value = true

    const { valid } = await validate()
    if (!valid) {
      throw new Error('Validation Error')
    }

    if (hasId) {
      await props.submitFn?.(_item as T, true)
      toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Updated`)
    }
    else {
      await props.submitFn?.(_item as T)
      toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Created`)
    }

    showItemDialog.value = false
  }
  catch (error: any) {
    toast.toastError(String(error.message))
    crudLogger.withTag(`saveItem`).error(error)
  }
  finally {
    isSaving.value = false
  }
}

/**
 * 删除
 */
const showItemDeleteDialog = ref(false)
const showItemsDeleteDialog = ref(false)
const isDeleteing = ref(false)
const selectedItems = ref<T[]>()

function confirmDeleteSelected() {
  showItemsDeleteDialog.value = true
}

function confirmDeleteItem(_item: T) {
  setValues(JSON.parse(JSON.stringify(_item)))
  showItemDeleteDialog.value = true
}

// base
async function deleteItems(items: T[]) {
  crudLogger.withTag(`deleteItems`).log(items)

  isDeleteing.value = true
  await props.deleteFn?.(items)
}

async function deleteItem() {
  try {
    await deleteItems([values as T])
    showItemDeleteDialog.value = false
    toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Deleted`)
  }
  catch (error: any) {
    toast.toastError(String(error.message))
    crudLogger.withTag(`deleteItem`).error(error)
  }
  finally {
    isDeleteing.value = false
  }
}

async function deleteSelectedItems() {
  try {
    await deleteItems(selectedItems.value ?? [])
    showItemsDeleteDialog.value = false
    selectedItems.value = undefined
    toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)}s Deleted`)
  }
  catch (error: any) {
    toast.toastError(String(error.message))
    crudLogger.withTag(`deleteSelectedItems`).error(error)
  }
  finally {
    isDeleteing.value = false
  }
}

/**
 * 导出 CSV
 */
function exportCSV() {
  dataTableRef.value.exportCSV()
}

/**
 * 关闭弹窗时重置表单
 */
watch([showItemDialog, showItemDeleteDialog], ([_item, _itemDelete]) => {
  // NOTE 目前不会存在两个弹窗同时打开的情况, 所以一个关闭时另一个一定是已经处于关闭状态的
  if (!_item && !_itemDelete) {
    forceResetFormValues()
  }
})

defineExpose({
  isUpdating: computed(() => !!values._id),
})
</script>

<template>
  <div>
    <div class="component-card">
      <PrimeToolbar v-if="!props.disableHeader" class="mb-6">
        <template #start>
          <PrimeButton
            v-if="!props.disableAdd"
            label="New"
            icon="i-prime:plus"
            severity="secondary"
            class="mr-2"
            @click="openNew"
          />
          <PrimeButton
            v-if="!props.disabledMultiDelete"
            label="Delete"
            icon="i-prime:trash"
            severity="secondary"
            :disabled="!selectedItems || !selectedItems.length"
            @click="confirmDeleteSelected"
          />
        </template>

        <template #end>
          <PrimeButton
            v-if="!props.disableExport"
            label="Export"
            icon="i-prime:upload"
            severity="secondary"
            @click="exportCSV"
          />
        </template>
      </PrimeToolbar>

      <PrimeDataTable
        ref="dataTableRef"
        v-model:selection="selectedItems"
        v-model:filters="filters"
        v-bind="{
          ...dataTableProps,
          value: props.items,
          loading: props.loading,
          first: (pagination.pageNo - 1) * pagination.pageSize,
          rows: pagination.pageSize,
          ...($attrs?.['data-table-props'] ?? {}),
        }"
        @page="handlePage"
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="m-0">
              Manage {{ Utils._.upperFirst(props.itemAlias) }}
            </h4>
            <PrimeIconField v-if="!props.disableGlobalFilter">
              <PrimeInputIcon>
                <i class="i-prime:search" />
              </PrimeInputIcon>
              <PrimeInputText
                placeholder="Search..."
                :model-value="filters.global!.value"
                @update:model-value="handleGlobalFilter"
              />
            </PrimeIconField>
          </div>
        </template>

        <!-- TODO props -->
        <PrimeColumn
          v-if="!props.disableMultiSelect"
          selection-mode="multiple"
          style="width: 3rem"
          :exportable="false"
          frozen
        />

        <slot name="columns">
          <!-- Column -->
        </slot>

        <!-- TODO props -->
        <PrimeColumn
          v-if="!props.disableActions"
          :exportable="false"
          style="min-width: 12rem"
          frozen
          align-frozen="right"
        >
          <template #body="slotProps">
            <PrimeButton
              v-if="!props.disableEdit"
              icon="i-prime:pencil"
              outlined
              rounded
              class="mr-2"
              @click="editItem(slotProps.data)"
            />
            <PrimeButton
              v-if="!props.disableDelete"
              icon="i-prime:trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteItem(slotProps.data)"
            />

            <slot name="action-extra" :item="(slotProps.data as T)" />
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>

    <PrimeDialog
      v-model:visible="showItemDialog"
      :style="{ width: 'clamp(450px, 80vw, 1200px)' }"
      :header="`${Utils._.upperFirst(props.itemAlias)} Details`"
      :modal="true"
      append-to="self"
    >
      <div class="flex flex-col gap-6">
        <PrimeAccordion multiple :value="['_default']">
          <PrimeAccordionPanel
            v-for="i in formFieldsInfoGroup"
            :key="i.title"
            :value="i.title"
          >
            <PrimeAccordionHeader v-if="i.title !== '_default'">
              <div class="flex items-center gap-2">
                <i class="i-prime:th-large" />
                {{ i.title }}
              </div>
            </PrimeAccordionHeader>

            <PrimeAccordionContent>
              <div class="gap-6" :class="[i.formClass ?? `component-curd-form-fields-group-${i.title.replaceAll(' ', '_')}`]">
                <template
                  v-for="field in i.fields"
                  :key="field!.name"
                >
                  <template v-if="field!.custom">
                    <slot
                      :name="`form-field-${field!.name as string}`"
                      :field="field"
                    >
                      {{ field }}
                    </slot>
                  </template>

                  <CrudFormFieldArray
                    v-else-if="field?.fieldArray"
                    :field="field!"
                  />

                  <CrudFormField v-else :field="field!" :force-value="values[field!.name as any]" />
                </template>
              </div>
            </PrimeAccordionContent>
          </PrimeAccordionPanel>
        </PrimeAccordion>
      </div>

      <template #footer>
        <PrimeButton label="Cancel" icon="i-prime:times" text @click="hideItemDialog" />
        <PrimeButton label="Save" icon="i-prime:check" :loading="isSaving" @click="saveItem" />
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="showItemDeleteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      append-to="self"
    >
      <div class="flex items-center gap-4">
        <i class="i-prime:exclamation-triangle !text-3xl" />
        <span>Are you sure you want to delete <b>{{ values._name }}</b>?</span>
      </div>
      <template #footer>
        <PrimeButton label="No" icon="i-prime:times" text @click="showItemDeleteDialog = false" />
        <PrimeButton label="Yes" icon="i-prime:check" :loading="isDeleteing" @click="deleteItem" />
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="showItemsDeleteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      append-to="self"
    >
      <div class="flex items-center gap-4">
        <i class="i-prime:exclamation-triangle !text-3xl" />
        <span>Are you sure you want to delete the selected items?</span>
      </div>
      <template #footer>
        <PrimeButton label="No" icon="i-prime:times" text @click="showItemsDeleteDialog = false" />
        <PrimeButton label="Yes" icon="i-prime:check" text @click="deleteSelectedItems" />
      </template>
    </PrimeDialog>
  </div>
</template>
