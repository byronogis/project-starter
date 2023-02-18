<template>
  <div class="layouts_default">
    <BaseSideRoutes />
    <div><RouterView /></div>
  </div>
</template>

<style scoped>
.layouts_default {
  height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
}
</style>
