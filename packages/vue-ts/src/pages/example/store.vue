<script setup lang="ts">
const user = useUserStore()

const name = computed({
  get: () => user.username,
  set: val => user.setNewName(val),
})
</script>

<template>
  <div class="page-example-user">
    <h2>User</h2>
    <input v-model="name" type="text">
    <p>{{ user.username }}</p>
  </div>
</template>

<style scoped lang="postcss"></style>
