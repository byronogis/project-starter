<script setup lang="ts" generic="
  F extends SharedFormField<any, any, any, PrimoFormFieldType, PrimoFormFieldExtra>
"
>
const props = defineProps<{
  field: F
}>()

// const toast = inject(PrimoToastInjectionKey, usePrimoToast())

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
    class="component-primo-form-field-array"
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
        class="component-primo-form-field-array-item gap-6"
        :class="[
          `component-primo-form-field-array-item-${gridArea}`,
        ]"
      >
        <!-- 数组字段中的子字段 -->
        <template
          v-for="j in field.fieldArrayItemFormFields"
          :key="j.name"
        >
          <PrimoFormField
            :field="{
              ...j!,
              name: `${field.name}[${idx}].${j!.name}`,
              gridArea: `${field.name}.${j!.name}`,
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
          severity="warn"
          @click="remove(idx)"
        >
          <template #icon>
            <NuxtIcon name="i-prime:minus" />
          </template>
        </PrimeButton>
      </div>

      <PrimeDivider />
    </template>

    <div
      class="component-primo-form-field-array-add grid place-content-center"
    >
      <PrimeButton
        label="Add"
        severity="secondary"
        @click="push({})"
      >
        <template #icon>
          <NuxtIcon name="i-prime:plus" />
        </template>
      </PrimeButton>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
