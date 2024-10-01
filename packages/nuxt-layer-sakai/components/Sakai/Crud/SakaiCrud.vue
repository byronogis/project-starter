<script setup lang="ts" generic="
  T extends SharedFormItem,
"
>
import type {
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTablePageEvent,
} from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import SakaiForm from '../Form/SakaiForm.vue'

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
  formFieldsInfo?:
    | Partial<SakaiFormFieldInfo<T, string>>
    | SakaiFormFieldsInfoGroupItem<T, string>[]
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
  submitFn?: (items: Partial<T>[], update?: boolean) => Promise<void>
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
   * 是否禁用表格 header
   * @default false
   */
  disableTableHeader?: boolean
  /**
   * 是否禁用操作列
   * @default false
   */
  disableActionsColumn?: boolean
}>(), {
  itemAlias: 'item',
  items: () => [],
  formFieldsInfo: () => ({}),
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
  disableTableHeader: false,
  disableActionsColumn: false,
})

/**
 * 工具
 */
const sakaiCrudLogger = Utils.logger.withTag(`SakaiCrud`).withTag(`${Utils._.upperFirst(props.itemAlias)}`)

const toast = inject(SakaiToastInjectionKey, useSakaiToast())

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

  // TODO 不生效 ? 表格内容不会更新
  console.log('handleGlobalFilter', val)
  filters.value.global!.value = val
}

/**
 * 表单字段信息
 */
// const sakaiFormRef = ref<ComponentExposed<typeof SakaiForm>>()
const {
  fieldsInfoGroup,
  // fieldsInfoFlat,
  values,
  setValues,
  validate,
  forceResetFormValues,

  // context,
} = useSharedForm<
  T,
  string,
  SakaiFormFieldItemType,
  SakaiFormFieldItemExtra
>({
  fieldsInfo: () => props.formFieldsInfo,
})

/**
 * 新增/编辑
 */
const showItemDialog = ref(false)
const isSaving = ref(false)

function editItem(_item: T) {
  setValues(JSON.parse(JSON.stringify(_item)))
  showItemDialog.value = true
}

async function saveItem() {
  const _item = values
  // TODO id judege
  const hasId = '_id' in _item && _item._id

  sakaiCrudLogger.withTag(`saveItem`).log({ ..._item })

  try {
    isSaving.value = true

    const { valid } = await validate()
    if (!valid) {
      throw new Error('Validation Error')
    }

    if (hasId) {
      await props.submitFn?.([_item] as T[], true)
      toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Updated`)
    }
    else {
      await props.submitFn?.([_item] as T[])
      toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Created`)
    }

    showItemDialog.value = false
  }
  catch (error: any) {
    toast.toastError(String(error?.message))
    sakaiCrudLogger.withTag(`saveItem`).error(error?.message)
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
async function baseDeleteItems(items: T[]) {
  sakaiCrudLogger.withTag(`baseDeleteItems`).log(items)

  isDeleteing.value = true
  await props.deleteFn?.(items)
}

async function deleteItem() {
  try {
    await baseDeleteItems([values as T])
    showItemDeleteDialog.value = false
    toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)} Deleted`)
  }
  catch (error: any) {
    toast.toastError(String(error?.message))
    sakaiCrudLogger.withTag(`deleteItem`).error(error?.message)
  }
  finally {
    isDeleteing.value = false
  }
}

async function deleteSelectedItems() {
  try {
    await baseDeleteItems(selectedItems.value ?? [])
    showItemsDeleteDialog.value = false
    selectedItems.value = undefined
    toast.toastSuccess(`${Utils._.upperFirst(props.itemAlias)}s Deleted`)
  }
  catch (error: any) {
    toast.toastError(String(error?.message))
    sakaiCrudLogger.withTag(`deleteSelectedItems`).error(error?.message)
  }
  finally {
    isDeleteing.value = false
  }
}

/**
 * 表格
 */
const dataTableRef = ref()
const dataTableProps = ref({
  dataKey: 'id',
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
  <div class="component-sakai-crud">
    <div class="component-card">
      <Toolbar v-if="!props.disableHeaderActionBar" class="mb-6">
        <template #start>
          <Button
            v-if="!props.disableAdd"
            label="New"
            icon="i-prime:plus"
            severity="secondary"
            class="mr-2"
            @click="showItemDialog = true"
          />
          <Button
            v-if="!props.disabledMultiDelete"
            label="Delete"
            icon="i-prime:trash"
            severity="secondary"
            :disabled="!selectedItems?.length"
            @click="confirmDeleteSelected"
          />
        </template>

        <template #end>
          <Button
            v-if="!props.disableExport"
            label="Export"
            icon="i-prime:upload"
            severity="secondary"
            @click="exportCSV"
          />
        </template>
      </Toolbar>

      <DataTable
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
        <template v-if="!props.disableTableHeader" #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="m-0">
              Manage {{ Utils._.upperFirst(props.itemAlias) }}
            </h4>
            <IconField v-if="!props.disableGlobalFilter">
              <InputIcon>
                <i class="i-prime:search" />
              </InputIcon>
              <InputText
                placeholder="Search..."
                :model-value="filters.global!.value"
                @update:model-value="handleGlobalFilter"
              />
            </IconField>
          </div>
        </template>

        <!-- TODO props -->
        <Column
          v-if="!props.disableMultiSelect"
          selection-mode="multiple"
          style="width: 3rem"
          :exportable="false"
          frozen
        />

        <Column
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
        <Column
          v-if="!props.disableActionsColumn"
          :exportable="false"
          style="min-width: 12rem"
          frozen
          align-frozen="right"
          class="space-x-2"
        >
          <template #body="slotProps">
            <Button
              v-if="!props.disableEdit"
              icon="i-prime:pencil"
              outlined
              rounded
              @click="editItem(slotProps.data)"
            />
            <Button
              v-if="!props.disableDelete"
              icon="i-prime:trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteItem(slotProps.data)"
            />

            <slot name="action-extra" :item="(slotProps.data as T)" />
          </template>
        </Column>

        <!-- TODO pref v-for $slot -->
        <template #expansion="slotProps">
          <slot name="expansion" v-bind="slotProps" />
        </template>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="showItemDialog"
      :style="{ width: 'clamp(450px, 80vw, 1200px)' }"
      :header="`${Utils._.upperFirst(props.itemAlias)} Details`"
      :modal="true"
      append-to="self"
    >
      <template #default>
        <SakaiForm
          :fields-info-group="fieldsInfoGroup"
        />
      </template>

      <template #footer>
        <Button label="Cancel" icon="i-prime:times" text @click="showItemDialog = false" />
        <Button label="Save" icon="i-prime:check" :loading="isSaving" @click="saveItem" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showItemDeleteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      append-to="self"
    >
      <div class="flex items-center gap-4">
        <i class="i-prime:exclamation-triangle !text-3xl" />
        <span>Are you sure you want to delete <b>{{ values._label }}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="i-prime:times" text @click="showItemDeleteDialog = false" />
        <Button label="Yes" icon="i-prime:check" :loading="isDeleteing" @click="deleteItem" />
      </template>
    </Dialog>

    <Dialog
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
        <Button label="No" icon="i-prime:times" text @click="showItemsDeleteDialog = false" />
        <Button label="Yes" icon="i-prime:check" text @click="deleteSelectedItems" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped lang="postcss"></style>
