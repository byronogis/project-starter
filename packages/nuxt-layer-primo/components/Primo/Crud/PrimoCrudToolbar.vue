<script setup lang="ts">
interface Props {
  isChecked?: boolean
  disableAdd?: boolean
  disabledMultiDelete?: boolean
  disableExport?: boolean
  disableGlobalFilter?: boolean
  order?: {
    add?: number
    delete?: number
    export?: number
    globalFilter?: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  isChecked: false,
  disableAdd: false,
  disabledMultiDelete: false,
  disableExport: false,
  disableGlobalFilter: false,
  order: () => ({
    add: 0,
    delete: 1,
    export: 2,
    globalFilter: 3,
  }),
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
      :class="`order-${props.order.add}`"
      severity="secondary"
      @click="emits('add')"
    >
      <template #icon>
        <NuxtIcon name="i-prime:plus" />
      </template>
    </PrimeButton>

    <PrimeButton
      v-if="!props.disabledMultiDelete"
      label="Delete"
      :class="`order-${props.order.delete}`"
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
      :class="`order-${props.order.export}`"
      severity="secondary"
      @click="emits('export')"
    >
      <template #icon>
        <NuxtIcon name="i-prime:upload" />
      </template>
    </PrimeButton>

    <PrimeIconField
      v-if="!props.disableGlobalFilter"
      class="order-101"
      :class="`order-${props.order.globalFilter}`"
    >
      <PrimeInputIcon>
        <NuxtIcon name="i-prime:search" />
      </PrimeInputIcon>
      <PrimeInputText
        v-model="globalFilterText"
        placeholder="Search..."
      />
    </PrimeIconField>

    <slot name="extra" />
  </div>
</template>

<style scoped lang="postcss"></style>
