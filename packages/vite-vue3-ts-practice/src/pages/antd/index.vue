<script setup lang="ts">
const open = () => {
  AMessage.info('this is a message.')
}
</script>

<template>
  <a-button type="primary" @click="open">
    Show message
  </a-button>
</template>
