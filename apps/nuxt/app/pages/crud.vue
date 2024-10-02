<script setup lang="ts">
import type {
  DataTableFilterMeta,
} from 'primevue/datatable'

definePageMeta({
  layout: 'sakai-primary',
})

const name = 'example'

const exampleLogger = Utils.logger.withTag(name)

const crudRef = useTemplateRef('crudRef')
const isUpdating = computed(() => !!crudRef.value?.isUpdating)

const formFieldsInfo = ref(exampleFormFieldsInfoCST)

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
  placeholderData: () => ({ list: [] }),
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
    <SakaiCrud
      ref="crudRef"
      v-model:filters="filters"
      :item-alias="name"
      :items="data?.list"
      :loading="isLoading"
      :form-fields-info="formFieldsInfo"
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
        <Column field="id" header="ID" style="min-width: 10rem" />

        <Column field="name" header="Name" style="min-width: 10rem" />
      </template>
    </SakaiCrud>
  </div>
</template>

<style scoped lang="postcss">
:deep(.shared-form-fields-group-_default) {
  display: grid;
  grid-template:
    'id  name  avatar' auto
    'id  name  avatar' auto / 1fr 1fr 1fr;
}

:deep(.component-sakai-form-field-array-item-contacts) {
  display: grid;
  grid-template:
    'contacts_email contacts_phone contacts_website .      ' auto
    'contacts_email contacts_phone contacts_website _remove' auto / 1fr 1fr 1fr;
}
</style>
