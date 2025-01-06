<script setup lang="ts">
const userStore = useUserStore()

const toast = usePrimoToast()
</script>

<template>
  <div id="page-index" class="[*:has(>&)]:(grid place-content-center)">
    <h1 class="text-8">
      Hi {{ userStore.name }}
      <NuxtIcon name="custom:home" @click="toast.toastSuccess(Utils.date.format(Date.now(), 'yyyy-MM-dd HH:mm:dd'))" />
    </h1>
  </div>
</template>

<style scoped lang="postcss"></style>
