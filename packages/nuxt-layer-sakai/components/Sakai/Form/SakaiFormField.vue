<script setup lang="ts" generic="
  T extends SharedFormFieldItem<any, any, any, SakaiFormFieldItemType, SakaiFormFieldItemExtra>
"
>
import SakaiUploader from '../SakaiUploader.vue'

const props = defineProps<{
  field: T
  /**
   * solve: form values will be covered by the initialValue value of usefield
   * @see https://github.com/logaretm/vee-validate/issues/4846
   */
  forceValue?: T['valueType']
}>()

const toast = inject(SakaiToastInjectionKey, useSakaiToast())

const field = computed(() => props.field)
const gridArea = computed(() => (props.field.gridArea ?? props.field.name)
// TODO regex replace
  .replaceAll('.', '_')
  .replaceAll('[', '_')
  .replaceAll(']', '_'),
)

const {
  value,
  errorMessage,
} = useField(
  () => props.field.name,
  props.field.schema,
  {
    initialValue: props.forceValue ?? props.field.initialValue,
  },
)

/**
 * merge props
 */
const fieldPropsMerged = computed(() => {
  let _props: Record<string, any> = {
    'class': 'w-full',
    'id': field.value.name,
    'modelValue': value.value,
    'onUpdate:modelValue': (val: T['valueType']) => {
      value.value = val
    },
    'disabled': field.value.disable,
    'placeholder': field.value.placeholder,

    ...field.value.extra?.props ?? {},
  }

  switch (field.value.type) {
    case 'text':
      break

    case 'textarea':
      _props = {
        // autoResize: true,
        rows: 3,

        ..._props,
      }
      break

    case 'number':
      _props = {
        inputId: field.value.name,

        ..._props,

        id: undefined,
      }
      break

    case 'datetime':
      _props = {
        inputId: field.value.name,
        showTime: true,
        showSeconds: true,

        ..._props,

        id: undefined,
        modelValue: toValue(value)
          ? new Date(Number(String(toValue(value)).padEnd(13, '0')))
          : undefined,
        onUpdateModelValue: (val: Date) => {
          value.value = val.valueOf()
        },
      }
      break

    case 'select':
      _props = {
        optionLabel: 'label',
        optionValue: 'value',

        ..._props,

        options: field.value.options ?? [],
      }
      break

    case 'select-group':
      _props = {
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupLabel: 'label',
        optionGroupChildren: 'children',

        ..._props,

        options: field.value.options ?? [],
      }

      break

    case 'image':
      _props = {
        preview: true,
        alt: 'Image',
        src: toValue(value),

        ..._props,

        class: 'w-full object-contain [&_img]:w-full',
      }

      break

    case 'images':
      _props = {
        preview: true,
        alt: 'Image',

        ..._props,

        class: 'w-full object-contain [&_img]:w-full',
      }

      break

    case 'json':
      _props = {
        ..._props,

        'modelValue': typeof value.value === 'string'
          ? Utils.safeJSONParse(value.value).value ?? null
          : toValue(value),
        'onUpdate:modelValue': (val: T['valueType']) => {
          value.value = typeof value.value === 'string'
            ? JSON.stringify(val)
            : val
        },
      }

      break

    default:
      break
  }

  return _props
})

/**
 * field image
 */
const uploaderRef = ref<InstanceType<typeof SakaiUploader> | null>(null)
const showFieldImageEditDialog = ref(false)
const fieldImageValueTempList = ref<string[]>([])
function handleFieldImageEdit() {
  showFieldImageEditDialog.value = true
}
function handleFieldImageSave() {
  // 修改图片表单值
  if (!fieldImageValueTempList.value.length) {
    toast.toastWarn('Please upload an image first.')
    return
  }
  value.value = field.value.type === 'images'
    ? [
        ...value.value,
        ...fieldImageValueTempList.value,
      ]
    : fieldImageValueTempList.value[0]

  fieldImageValueTempList.value = []
  showFieldImageEditDialog.value = false
}
function handleFieldImageCancel() {
  fieldImageValueTempList.value = []
  showFieldImageEditDialog.value = false
}
</script>

<template>
  <div
    class="component-sakai-from-field"
    :style="[
      {
        'grid-area': gridArea,
      },
    ]"
  >
    <label :for="field.name" class="mb-3 block font-bold">{{ field.label }}</label>

    <template v-if="field.type === 'text'">
      <!-- TODO fix type: value -->
      <InputText
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'textarea'">
      <Textarea
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'number'">
      <InputNumber
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'datetime'">
      <DatePicker
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'select'">
      <Select
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'select-group'">
      <Select
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="['image', 'images'].includes(field.type ?? '')">
      <template v-if="field.type === 'images'">
        <div
          :style="{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
          }"
        >
          <Button
            class="w-full"
            outlined
            icon="i-prime:plus"
            aria-label="Filter"
            @click.stop="handleFieldImageEdit"
          />

          <Image
            v-for="(i, idx) in value"
            v-bind="fieldPropsMerged"
            :key="i"
            :src="i"
          >
            <template #previewicon>
              <div class="flex flex-row gap-x-4 text-1.5em">
                <i class="i-prime:eye" />
                <i
                  class="i-prime:times"
                  @click.stop="value.splice(idx, 1)"
                />
              </div>
            </template>
          </Image>
        </div>
      </template>

      <Image v-else v-bind="fieldPropsMerged">
        <template #previewicon>
          <div class="flex flex-row gap-x-4 text-1.5em">
            <i class="i-prime:file-edit" @click.stop="handleFieldImageEdit" />
            <i class="i-prime:eye" />
            <i
              v-if="fieldPropsMerged.src"
              class="i-prime:times"
              @click.stop="value = ''"
            />
          </div>
        </template>
      </Image>

      <Dialog
        v-model:visible="showFieldImageEditDialog"
        :style="{ width: '450px' }"
        header="Upload Image"
        :modal="true"
        append-to="self"
      >
        <div class="flex items-center gap-4">
          <SakaiUploader
            ref="uploaderRef"
            class="flex-1"
            v-bind="field.extra?.uploaderProps"
            :server-process-callback="field.extra?.fileUploadProcess"
            @done="fieldImageValueTempList.push($event.url)"
          />
        </div>
        <template #footer>
          <Button
            label="Cancel"
            icon="i-prime:times"
            text
            @click="handleFieldImageCancel"
          />
          <Button
            label="Save"
            icon="i-prime:check"
            :disabled="uploaderRef?.isUploading"
            @click="handleFieldImageSave"
          />
        </template>
      </Dialog>
    </template>

    <template v-else-if="field.type === 'json'">
      <SakaiJsonEditor
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else>
      <InputText
        :id="field.name"
        v-model.trim="value"
        class="w-full"
        v-bind="field.extra?.props"
        :disabled="field.disable"
      />
    </template>

    <small class="text-red-500">{{ errorMessage }}</small>
  </div>
</template>

<style scoped lang="postcss"></style>
