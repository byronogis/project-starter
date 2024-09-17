<script setup lang="ts">
definePageMeta({
  layout: 'sakai',
})

const appToast = useAppToast()
</script>

<template>
  <div id="page-sakai">
    <h4>Sakai Page</h4>
    <PrimeInputText />
    <PrimeButton label="fine" @click="appToast.toastSuccess('fine')" />
  </div>
</template>

<style scoped lang="postcss"></style>
