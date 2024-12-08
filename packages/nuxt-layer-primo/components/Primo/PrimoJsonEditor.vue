<script setup lang="ts">
import JsonEditorVue from 'json-editor-vue'
import { parse, stringify } from 'lossless-json'
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'

// @see https://github.com/vuejs/core/issues/11123
const props = withDefaults(defineProps</* @vue-ignore */ ComponentProps<typeof JsonEditorVue>>(), {
  // ...
})

// @see https://github.com/josdejong/svelte-jsoneditor/#properties
const bindProps = computed(() => ({
  // @ts-expect-error 多次指定了 *，因此将重写此用法。ts-plugin(2783)
  mainMenuBar: true,
  // @ts-expect-error 多次指定了 *，因此将重写此用法。ts-plugin(2783)
  navigationBar: true,
  // @ts-expect-error 多次指定了 *，因此将重写此用法。ts-plugin(2783)
  stringified: false,

  ...props,
}))

const LosslessJSONParser = {
  parse,
  stringify,
}
</script>

<template>
  <JsonEditorVue
    v-bind="bindProps"
    :parser="LosslessJSONParser"
    class="[html.dark]:jse-theme-dark"
  />
</template>

<style scoped lang="postcss"></style>
