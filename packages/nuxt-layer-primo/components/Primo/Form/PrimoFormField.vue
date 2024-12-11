<script setup lang="ts" generic="
  F extends SharedFormField<any, any, any, PrimoFormFieldType, PrimoFormFieldExtra>
"
>
import PrimoUploader from '../PrimoUploader.vue'

const props = defineProps<{
  field: F
}>()

const toast = inject(PrimoToastInjectionKey, usePrimoToast())

const field = computed(() => props.field)

const currentValue = useFieldValue(props.field.name)

const {
  value,
  errorMessage,
} = useField(
  () => props.field.name,
  toTypedSchema(props.field.schema),
  {
    initialValue: currentValue.value ?? props.field.initialValue,
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
    'onUpdate:modelValue': (val: F['valueType']) => {
      value.value = val
    },
    'disabled': field.value.disable,
    'placeholder': field.value.placeholder,

    ...field.value.extra?.props ?? {},
  }

  switch (field.value.type) {
    case 'text':
      break

    case 'password':
      _props = {
        inputId: field.value.name,
        toggleMask: true,
        feedback: false,
        fluid: true,

        ..._props,
      }
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

    case 'multi-select':
      _props = {
        inputId: field.value.name,
        optionLabel: 'label',
        optionValue: 'value',

        ..._props,

        options: field.value.options ?? [],
      }

      break

    case 'multi-select-group':
      _props = {
        inputId: field.value.name,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupLabel: 'label',
        optionGroupChildren: 'children',

        ..._props,

        options: field.value.options ?? [],
      }

      break

    case 'slider':
      _props = {
        min: 0,
        max: 100,
        step: 1,

        ..._props,
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
        'onUpdate:modelValue': (val: F['valueType']) => {
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
const uploaderRef = ref<InstanceType<typeof PrimoUploader> | null>(null)
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
    class="component-primo-from-field"
    :style="[
      {
        'grid-area': props.field.gridArea!,
      },
    ]"
  >
    <label :for="field.name" class="mb-3 block font-bold">{{ field.label }}</label>

    <template v-if="field.type === 'text'">
      <!-- TODO fix type: value -->
      <PrimeInputText
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'password'">
      <PrimePassword
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'textarea'">
      <PrimeTextarea
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'number'">
      <PrimeInputNumber
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'datetime'">
      <PrimeDatePicker
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'select'">
      <PrimeSelect
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'select-group'">
      <PrimeSelect
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'multi-select'">
      <PrimeMultiSelect
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'multi-select-group'">
      <PrimeMultiSelect
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else-if="field.type === 'slider'">
      <PrimeSlider
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
          <PrimeButton
            class="w-full"
            outlined
            aria-label="Filter"
            @click.stop="handleFieldImageEdit"
          >
            <template #icon>
              <NuxtIcon name="i-prime:plus" />
            </template>
          </PrimeButton>

          <PrimeImage
            v-for="(i, idx) in value"
            v-bind="fieldPropsMerged"
            :key="i"
            :src="i"
          >
            <template #previewicon>
              <div class="flex flex-row gap-x-4 text-1.5em">
                <NuxtIcon name="i-prime:eye" />
                <NuxtIcon name="i-prime:times" @click.stop="value.splice(idx, 1)" />
              </div>
            </template>
          </PrimeImage>
        </div>
      </template>

      <PrimeImage v-else v-bind="fieldPropsMerged">
        <template #previewicon>
          <div class="flex flex-row gap-x-4 text-1.5em">
            <NuxtIcon name="i-prime:file-edit" @click.stop="handleFieldImageEdit" />
            <NuxtIcon name="i-prime:eye" />
            <NuxtIcon v-if="fieldPropsMerged.src" name="i-prime:times" @click.stop="value = ''" />
          </div>
        </template>
      </PrimeImage>

      <PrimeDialog
        v-model:visible="showFieldImageEditDialog"
        :style="{ width: '450px' }"
        header="Upload Image"
        :modal="true"
        append-to="self"
      >
        <div class="flex items-center gap-4">
          <PrimoUploader
            ref="uploaderRef"
            class="flex-1"
            v-bind="field.extra?.uploaderProps"
            :server-process-callback="field.extra?.fileUploadProcess"
            @done="fieldImageValueTempList.push($event.url)"
          />
        </div>
        <template #footer>
          <PrimeButton
            label="Cancel"
            text
            @click="handleFieldImageCancel"
          >
            <template #icon>
              <NuxtIcon name="i-prime:times" />
            </template>
          </PrimeButton>
          <PrimeButton
            label="Save"
            :disabled="uploaderRef?.isUploading"
            @click="handleFieldImageSave"
          >
            <template #icon>
              <NuxtIcon name="i-prime:check" />
            </template>
          </PrimeButton>
        </template>
      </PrimeDialog>
    </template>

    <template v-else-if="field.type === 'json'">
      <PrimoJsonEditor
        v-bind="fieldPropsMerged"
      />
    </template>

    <template v-else>
      <PrimeInputText
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
