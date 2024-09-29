<script setup lang="ts" generic="
  T extends SakaiFormItem,
"
>
const props = withDefaults(defineProps<{
  /**
   * 表单字段信息
   */
  fieldsInfoGroup?: SakaiFormFieldsInfoGroupItem<T>[]
  /**
   * 表单字段值
   */
  values?: Record<string, any>
}>(), {
  fieldsInfoGroup: () => ([]),
  values: () => ({}),
})
</script>

<template>
  <div class="component-sakai-form">
    <Accordion multiple :value="['_default']">
      <AccordionPanel
        v-for="i in props.fieldsInfoGroup"
        :key="i.id"
        :value="i.id"
      >
        <AccordionHeader v-if="i.id !== '_default'">
          <div class="flex items-center gap-2">
            <i class="i-prime:th-large" />
            {{ i.name || i.id }}
          </div>
        </AccordionHeader>

        <AccordionContent>
          <div class="gap-6" :class="[i.formClass]">
            <template
              v-for="field in i.fields"
              :key="field!.name"
            >
              <!-- 自定义字段内容 -->
              <template v-if="field!.custom">
                <slot
                  :name="`field-${i.id}-${String(field!.name)}`"
                  :field="field"
                >
                  {{ field }}
                </slot>
              </template>

              <!-- 数组字段 -->
              <SakaiFormFieldArray
                v-else-if="field?.fieldArray"
                :field="field!"
              />

              <!-- 默认渲染 -->
              <SakaiFormField
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
