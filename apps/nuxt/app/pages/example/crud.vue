<script setup lang="ts">
import type {
  DataTableFilterMeta,
} from 'primevue/datatable'

definePageMeta({
  layout: 'primo-primary',
})

const name = 'example'

const exampleLogger = Utils.logger.withTag(name)

const crudRef = useTemplateRef('crudRef')
const isUpdating = computed(() => !!crudRef.value?.isUpdating)

const formFields = ref(exampleFormFieldsInfoCST)

const {
  data,
  isLoading,
} = useQuery<{
  list: ExampleItemWithForm[]
}>({
  queryKey: ['example', 'list'],
  queryFn: async () => {
    const res = await getExampleListAPI({})
    return {
      list: res.data.data.map(i => ({
        _id: i.id,
        _label: i.name,
        ...i,
      })),
    }
  },
  // placeholderData 的存在会导致 isLoading (isFetching && isPending) 一直为 false
  // placeholderData: () => ({ list: [] }),
})

async function submitFn(items: Partial<ExampleItemWithForm>[]) {
  if (isUpdating.value) {
    exampleLogger.info('Updating example', items)
    // return updateExample(items)
  }
  else {
    exampleLogger.info('Creating example', items)
    // return createExample(items)
  }
}

async function deleteFn(items: Partial<ExampleItemWithForm>[]) {
  await Utils._.delay(1000)
  exampleLogger.warn('Deleting example', items)
  // return deleteExample(items)
}

/**
 * 数据过滤器
 */
const filters = ref<DataTableFilterMeta>({
  // ...
})
</script>

<template>
  <div id="page-crud">
    <PrimoCrud
      ref="crudRef"
      v-model:filters="filters"
      :item-alias="name"
      :items="data?.list"
      :loading="isLoading"
      :form-fields
      :submit-fn="submitFn"
      :delete-fn="deleteFn"
      :disable-global-filter="false"
      :disable-multi-select="false"
      :disabled-multi-delete="false"
      :data-table-props="{
        // totalRecords: data?.list.length,
        // lazy: true,
      }"
    >
      <template #columns>
        <PrimeColumn field="id" header="ID" style="min-width: 10rem" />

        <PrimeColumn field="name" header="Name" style="min-width: 10rem" />
      </template>
    </PrimoCrud>
  </div>
</template>

<style scoped lang="postcss">
/* 基础信息分组布局 */
:deep(.shared-form_basic) {
  display: grid;
  grid-template: 'id      name       avatar' auto / 1fr 1fr 1fr;
  gap: 1rem;
}

/* 个人资料分组布局 */
:deep(.shared-form_profile) {
  display: grid;
  grid-template:
    'description  description' auto
    'tags         birthday   ' auto
    'score        _         ' auto / 1fr 1fr;
  gap: 1rem;
}

/* 系统设置分组布局 */
:deep(.shared-form_settings .component-primo-form-field-cascade-settings) {
  display: grid;
  grid-template: 'settings_theme  settings_notifications' auto / 1fr 1fr;
  gap: 1rem;
}

/* 联系方式分组布局 */
:deep(.shared-form_contacts .component-primo-form-field-array-item-contacts) {
  display: grid;
  grid-template:
    'contacts___email  contacts___phone  contacts___website  _     ' auto
    'contacts___email  contacts___phone  contacts___website  _remove' auto / 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: start;
}

/* 分组之间的间距 */
:deep(.shared-form_basic),
:deep(.shared-form_profile),
:deep(.shared-form_settings),
:deep(.shared-form_contacts) {
  padding: 1rem;
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
}
</style>
