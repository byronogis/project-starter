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
  /**
   * 表单字段值
   */
  values?: Record<string, any>
}>(), {
  groupList: () => ([]),
  values: () => ({}),
})
</script>

<template>
  <div class="component-primo-form">
    <Accordion multiple :value="['_default']">
      <AccordionPanel
        v-for="group in props.groupList"
        :key="group.id"
        :value="group.id"
      >
        <AccordionHeader v-if="group.id !== '_default'">
          <div class="flex items-center gap-2">
            <i class="i-prime:th-large" />
            {{ group.label ?? group.id }}
          </div>
        </AccordionHeader>

        <AccordionContent>
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
                :force-value="values[String(field!.name)]"
              />
            </template>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<style scoped lang="postcss"></style>
