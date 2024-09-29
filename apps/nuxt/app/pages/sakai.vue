<script setup lang="ts">
definePageMeta({
  layout: 'sakai-primary',
})

const appToast = useSakaiToast()
</script>

<template>
  <div id="page-sakai">
    <h4>Sakai Page</h4>
    <InputText />
    <Button label="fine" @click="appToast.toastSuccess('fine')" />
  </div>
</template>

<style scoped lang="postcss"></style>
