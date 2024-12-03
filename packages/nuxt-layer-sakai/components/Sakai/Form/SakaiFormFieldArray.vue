<script setup lang="ts" generic="
  F extends SharedFormField<any, any, any, SakaiFormFieldType, SakaiFormFieldExtra>
"
>
import type { SharedFormField } from '@project-starter/shared/composables'

const props = defineProps<{
  field: F
}>()

// const toast = inject(SakaiToastInjectionKey, useSakaiToast())

const field = computed(() => props.field)
const gridArea = computed(() => (props.field.gridArea!))

const {
  remove,
  push,
  fields,

} = useFieldArray(() => props.field.name)
</script>

<template>
  <div
    class="component-sakai-form-field-array"
    :style="[
      {
        'grid-area': gridArea,
      },
    ]"
  >
    <!-- 数组字段 -->
    <template
      v-for="(i, idx) in fields"
      :key="i.key"
    >
      <div
        class="component-sakai-form-field-array-item gap-6"
        :class="[
          `component-sakai-form-field-array-item-${gridArea}`,
        ]"
      >
        <!-- 数组字段中的子字段 -->
        <template
          v-for="j in field.fieldArrayItemFormFields"
          :key="j.name"
        >
          <SakaiFormField
            :field="{
              ...j!,
              name: `${field.name}[${idx}].${j!.name}`,
              gridArea: `${field.name}.${j!.name}`,
            }"
          />
        </template>

        <Button
          :style="[
            {
              'grid-area': '_remove',
            },
          ]"
          label="Remove"
          icon="i-prime:minus"
          severity="warn"
          @click="remove(idx)"
        />
      </div>

      <Divider />
    </template>

    <div
      class="component-sakai-form-field-array-add grid place-content-center"
    >
      <Button
        label="Add"
        icon="i-prime:plus"
        severity="secondary"
        @click="push({})"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
