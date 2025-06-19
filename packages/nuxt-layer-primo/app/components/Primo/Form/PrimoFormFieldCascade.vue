<script setup lang="ts" generic="
  F extends PrimoFormField<PrimoFormField>
"
>
const props = defineProps<{
  field: F
}>()

// const toast = usePrimoToast()

const field = computed(() => props.field)
const gridArea = computed(() => (props.field.extra?.gridArea))
</script>

<template>
  <div
    class="component-primo-form-field-cascade"
    :class="[
      `component-primo-form-field-cascade-${gridArea}`,
    ]"
    :style="[
      {
        'grid-area': gridArea,
      },
    ]"
  >
    <!-- 数组字段 -->
    <template
      v-for="i in field.cascadeFields"
      :key="i!.fieldPath"
    >
      <PrimoFormField
        :field="{
          ...i!,
          // for vee-validate nested field
          name: `${field.name}.${i!.name}`,
        }"
      />
    </template>
  </div>
</template>

<style scoped lang="postcss"></style>
