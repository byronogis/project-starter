<script setup lang="ts">
import type {
  DataTableFilterMeta,
} from 'primevue/datatable'
import type {
  ExampleFormFieldInfo,
  ExampleItem,
  ExampleItemWithForm,
} from '~/types/example'

/**
 * 文件上传处理
 */
const exampleFileUploadProcessCST: PrimoFormFieldFileUploadProcess = async (
  cxt,
  { signal },
) => {
  return await new Promise((resolve, _reject) => {
    console.log('exampleFileUploadProcessCST', cxt, signal)
    const url = URL.createObjectURL(cxt[1])

    resolve({
      url,
    })
  })
}

/**
 * 表单字段信息
 */
const exampleFormFieldsInfoCST: ExampleFormFieldInfo = {
  id: {
    name: 'id',
    label: 'ID',
    type: 'text',
    schema: (z.string().trim().optional()),
    disable: true,
    groupId: 'basic',
  },
  name: {
    name: 'name',
    label: '姓名',
    type: 'text',
    schema: (z.string().trim().min(2).max(20)),
    initialValue: 'Anon',
    placeholder: '请输入姓名',
    groupId: 'basic',
  },
  description: {
    name: 'description',
    label: '描述',
    type: 'textarea',
    schema: (z.string().max(500)),
    placeholder: '请输入描述信息',
    extra: {
      props: {
        rows: 4,
        maxlength: 500,
        showCount: true,
      },
    },
    groupId: 'profile',
  },
  avatar: {
    name: 'avatar',
    label: '头像',
    type: 'image',
    schema: (z.string().trim()),
    extra: {
      fileUploadProcess: exampleFileUploadProcessCST,
      uploaderProps: {
        allowMultiple: false,
        acceptedFileTypes: ['image/*'],
        maxFileSize: '5MB',
      },
    },
    groupId: 'basic',
  },
  tags: {
    name: 'tags',
    label: '标签',
    type: 'multi-select',
    schema: (z.array(z.string()).min(1)),
    initialValue: [],
    extra: {
      options: [
        { label: '前端', value: 'frontend' },
        { label: '后端', value: 'backend' },
        { label: '设计', value: 'design' },
        { label: '运维', value: 'ops' },
      ],
    },
    groupId: 'profile',
  },
  birthday: {
    name: 'birthday',
    label: '生日',
    type: 'datetime',
    schema: (z.number()), // 应该使用 number 而不是 string，因为日期选择器返回时间戳
    extra: {
      props: {
        dateFormat: 'yy-mm-dd',
        showTime: false,
      },
    },
    groupId: 'profile',
  },
  score: {
    name: 'score',
    label: '评分',
    type: 'slider',
    schema: (z.number().min(0).max(100)),
    initialValue: 60,
    extra: {
      props: {
        min: 0,
        max: 100,
        step: 1,
        showTooltip: true,
      },
    },
    groupId: 'profile',
  },
  settings: {
    name: 'settings',
    label: '设置',
    type: '_cascade',
    schema: (z.object({
      theme: z.string(),
      notifications: z.boolean(),
    })),
    isCascade: true,
    cascadeFields: {
      theme: {
        name: 'theme',
        label: '主题',
        type: 'select',
        schema: (z.string()),
        initialValue: 'light',
        extra: {
          options: [
            { label: '明亮', value: 'light' },
            { label: '暗黑', value: 'dark' },
            { label: '系统', value: 'system' },
          ],
        },
      },
      notifications: {
        name: 'notifications',
        label: '通知',
        type: 'select', // 应该改为更合适的类型，比如新增一个 'switch' 类型
        schema: (z.boolean()),
        initialValue: true,
        extra: {
          props: {
            type: 'switch',
          },
        },
      },
    },
    groupId: 'settings',
  },
  contacts: {
    name: 'contacts',
    label: '联系方式',
    groupId: 'contacts',
    type: '_array',
    schema: (z.array(z.object({
      email: z.string().email('请输入有效的邮箱地址'),
      phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
      website: z.string().url('请输入有效的网址'),
    }))),
    isArray: true,
    arrayFields: {
      email: {
        name: 'email',
        label: '邮箱',
        type: 'text',
        schema: (z.string().email('请输入有效的邮箱地址')),
        placeholder: 'example@domain.com',
      },
      phone: {
        name: 'phone',
        label: '电话',
        type: 'text',
        schema: (z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')),
        placeholder: '请输入手机号',
      },
      website: {
        name: 'website',
        label: '网站',
        type: 'text',
        schema: (z.string().url('请输入有效的网址')),
        placeholder: 'https://example.com',
      },
    },
  },
}

const name = 'example'

const exampleLogger = Utils.logger.withTag(name)

const crudRef = useTemplateRef('crudRef')
const isUpdating = computed(() => !!crudRef.value?.isUpdating)

const formFields = ref(exampleFormFieldsInfoCST)

const {
  data,
  status,
} = await useFetch('/api/example', {
  transform: (res: any) => {
    return {
      list: (res.data as ExampleItem[]).map(i => ({
        _id: i.id,
        _label: i.name,
        ...i,
      })),
    }
  },
  lazy: true,
  default: () => ({ list: [] }),
})
const isLoading = computed(() => status.value === 'pending')

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
