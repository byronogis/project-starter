<script setup lang="ts">
const open = () => {
  ElMessage('this is a message.')
}
</script>

<template>
  <el-button :plain="true" @click="open">
    Show message
  </el-button>
</template>
