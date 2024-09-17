<script setup lang="ts">
definePageMeta({
  layout: 'sakai',
})

const userStore = useUserStore()

const name = computed(() => userStore.name)
</script>

<template>
  <div id="page-index">
    <h1 class="text-8 color-#f00">
      Hello World! {{ name }} {{ userStore.name }}
      <NuxtIcon name="custom:home" />
    </h1>
  </div>
</template>

<style scoped lang="postcss"></style>
