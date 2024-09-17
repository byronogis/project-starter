<script setup lang="ts">
definePageMeta({
  layout: 'sakai',
})

const name = 'user'

const userLogger = Utils.logger.withTag(name)

const crudRef = useTemplateRef('crudRef')
const isUpdating = computed(() => !!crudRef.value?.isUpdating)

const formFieldsInfo = ref<UserFormFieldsInfoWithCrudGroupItem[]>(userFormFieldsInfoByGroupCST)

const {
  data,
  isLoading,
} = useQuery<{
  list: UserItemWithCrud[]
}>({
  queryKey: ['user', 'list'],
  queryFn: async () => {
    const res = await getUserListAPI({})
    return {
      list: res.data.data.map(i => ({
        _id: i.id,
        _name: i.name,
        ...i,
      })),
    }
  },
  placeholderData: () => ({ list: [] }),
})

async function submitFn(item: Partial<UserItemWithCrud>) {
  if (isUpdating.value) {
    userLogger.info('Updating user', item)
    // return updateUser(item)
  }
  else {
    userLogger.info('Creating user', item)
    // return createUser(item)
  }
}

async function deleteFn(items: Partial<UserItemWithCrud>[]) {
  userLogger.warn('Deleting user', items)
  // return deleteUser(item)
}
</script>

<template>
  <div id="page-crud">
    <Crud
      ref="crudRef"
      :item-alias="name"
      :items="data?.list"
      :loading="isLoading"
      :form-fields-info="formFieldsInfo"
      :submit-fn="submitFn"
      :delete-fn="deleteFn"
    >
      <template #columns>
        <PrimeColumn field="id" header="ID" style="min-width: 10rem" />

        <PrimeColumn field="name" header="Name" style="min-width: 10rem" />
      </template>
    </Crud>
  </div>
</template>

<style scoped lang="postcss">
:deep(.component-crud-form-fields-group-user-_default) {
  display: grid;
  grid-template:
    'id  name  avatar' auto
    'id  name  avatar' auto / 1fr 1fr 1fr;
}

:deep(.component-crud-from-field-array-item-contacts) {
  display: grid;
  grid-template:
    'contacts_email contacts_phone contacts_website .      ' auto
    'contacts_email contacts_phone contacts_website _remove' auto / 1fr 1fr 1fr;
}
</style>
