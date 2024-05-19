<script setup lang="ts">

</script>

<template>
  <n-config-provider
    class="page-example-naive"

    inline-theme-disabled preflight-style-disabled
  >
    <n-message-provider>
      <RouterView />
    </n-message-provider>
    <n-global-style />
  </n-config-provider>
</template>

<style scoped lang="postcss"></style>
