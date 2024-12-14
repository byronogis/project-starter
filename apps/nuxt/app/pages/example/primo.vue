<script setup lang="ts">
definePageMeta({
  layout: 'primo-primary',
})

const global = useGlobalToast()
</script>

<template>
  <div id="page-primo">
    <h4>Primo Page</h4>
    <PrimeInputText />
    <PrimeButton label="fine" @click="global.toastSuccess('fine')" />
  </div>
</template>

<style scoped lang="postcss"></style>
