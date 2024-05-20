<script setup lang="ts">
import axios from 'axios'

const url = ref('')
const data = ref()

function send() {
  axios.get(url.value).then(res => data.value = res.data)
}
</script>

<template>
  <div class="page-example-request">
    <textarea id="" v-model="url" type="text" name="" @keyup.enter="send" />
    <br>

    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<style scoped lang="postcss"></style>
