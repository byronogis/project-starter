<script setup lang="ts">
const toast = usePrimoToast()
</script>

<template>
  <div id="page-primo">
    <h4>Primo Page</h4>
    <PrimeInputText />
    <PrimeButton label="fine" @click="toast.toastSuccess('fine')" />
  </div>
</template>

<style scoped lang="postcss"></style>
