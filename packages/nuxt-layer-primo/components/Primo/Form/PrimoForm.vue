<script setup lang="ts" generic="
  D extends PrimoFormData,
  G extends string = never
"
>
const props = withDefaults(defineProps<{
  /**
   * 表单字段信息
   */
  groupList?: PrimoFormGroup<D, G>[]
}>(), {
  groupList: () => ([]),
})
</script>

<template>
  <div class="component-primo-form">
    <PrimeAccordion multiple :value="['_default']">
      <PrimeAccordionPanel
        v-for="group in props.groupList"
        :key="group.id"
        :value="group.id"
      >
        <PrimeAccordionHeader v-if="group.id !== '_default'">
          <div class="flex items-center gap-2">
            <NuxtIcon name="i-prime:th-large" />
            {{ group.label ?? group.id }}
          </div>
        </PrimeAccordionHeader>

        <PrimeAccordionContent>
          <div class="gap-6" :class="[group.formClass]">
            <template
              v-for="field in group.fields"
              :key="field!.name"
            >
              <!-- 自定义字段内容 -->
              <template v-if="field!.custom">
                <slot
                  :name="`field-${group.id}-${String(field!.name)}`"
                  :field="field"
                >
                  {{ field }}
                </slot>
              </template>

              <!-- 数组字段 -->
              <PrimoFormFieldArray
                v-else-if="field?.fieldArray"
                :field="field!"
              />

              <!-- 默认渲染 -->
              <PrimoFormField
                v-else
                :field="field!"
              />
            </template>
          </div>
        </PrimeAccordionContent>
      </PrimeAccordionPanel>
    </PrimeAccordion>
  </div>
</template>

<style scoped lang="postcss"></style>
