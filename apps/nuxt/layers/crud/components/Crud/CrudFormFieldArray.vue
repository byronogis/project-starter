<script setup lang="ts" generic="T extends CrudFormFieldItem<any, any>">
import type {
  CrudFormFieldItem,
} from '../../types/crud'

const props = defineProps<{
  field: T
}>()

// const toast = useToast()

const field = computed(() => props.field)
const gridArea = computed(() => (props.field.gridArea ?? props.field.name).replaceAll('.', '_'))

const {
  remove,
  push,
  fields,

} = useFieldArray(() => props.field.name)
</script>

<template>
  <div
    class="component-crud-from-field-array"
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
        class="component-crud-from-field-array-item gap-6"
        :class="[
          `component-crud-from-field-array-item-${gridArea}`,
        ]"
      >
        <!-- 数组字段中的子字段 -->
        <template
          v-for="j in field.fieldArrayItemFormFieldInfos!"
          :key="j.name"
        >
          <CrudFormField
            :field="{
              ...j,
              name: `${field.name}[${idx}].${j.name}`,
              gridArea: `${field.name}.${j.name}`,
            }"
          />
        </template>

        <PrimeButton
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

      <PrimeDivider />
    </template>

    <div
      class="component-crud-from-field-array-add grid place-content-center"
    >
      <PrimeButton
        label="Add"
        icon="i-prime:plus"
        severity="secondary"
        @click="push({})"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
