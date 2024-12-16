<script setup lang="ts">
interface Props {
  isChecked?: boolean
  disableAdd?: boolean
  disabledMultiDelete?: boolean
  disableExport?: boolean
  disableGlobalFilter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isChecked: false,
  disableAdd: false,
  disabledMultiDelete: false,
  disableExport: false,
  disableGlobalFilter: false,
})

const emits = defineEmits<{
  add: []
  deleteChecked: []
  export: []
  globalFilte: [val: string]
}>()

const globalFilterText = ref('')
watch(globalFilterText, (value) => {
  emits('globalFilte', value)
})
</script>

<template>
  <div class="component-primo-crud-toolbar flex items-center gap-2">
    <PrimeButton
      v-if="!props.disableAdd"
      label="New"
      severity="secondary"
      class="mr-2"
      @click="emits('add')"
    >
      <template #icon>
        <NuxtIcon name="i-prime:plus" />
      </template>
    </PrimeButton>

    <PrimeButton
      v-if="!props.disabledMultiDelete"
      label="Delete"
      severity="secondary"
      :disabled="!props.isChecked"
      @click="emits('deleteChecked')"
    >
      <template #icon>
        <NuxtIcon name="i-prime:trash" />
      </template>
    </PrimeButton>

    <PrimeButton
      v-if="!props.disableExport"
      label="Export"
      severity="secondary"
      @click="emits('export')"
    >
      <template #icon>
        <NuxtIcon name="i-prime:upload" />
      </template>
    </PrimeButton>

    <PrimeIconField v-if="!props.disableGlobalFilter" class="order-101">
      <PrimeInputIcon>
        <NuxtIcon name="i-prime:search" />
      </PrimeInputIcon>
      <PrimeInputText
        v-model="globalFilterText"
        placeholder="Search..."
      />
    </PrimeIconField>

    <i class="order-100 flex-1" />

    <slot name="extra" />
  </div>
</template>

<style scoped lang="postcss"></style>
