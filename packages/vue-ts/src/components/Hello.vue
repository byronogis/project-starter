<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * The message to display
   */
  msg: string
}>(), {
  msg: 'World',
})
</script>

<template>
  <div class="component-hello">
    <h2>Hello, {{ props.msg }}</h2>
  </div>
</template>

<style scoped lang="postcss">
.component-hello {
  color: red;
}
</style>
