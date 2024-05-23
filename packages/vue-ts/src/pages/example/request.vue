<script setup lang="ts">
const url = ref('/api/hello?foo=bar')
const method = ref('get')
const data = ref()

async function send() {
  console.log(http)
  try {
    // debugger
    await http.request({
      url: toValue(url),
      // method: toValue(method),
      params: {
        name: 'from params',
      },
      data: {
        name: 'from data',
      },
    })
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="page-example-request">
    <textarea id="" v-model="url" type="text" name="" />
    <br>
    <select id="" v-model="method" name="">
      <option v-for="i in ['get', 'post']" :key="i" :value="i">
        {{ i }}
      </option>
    </select>
    <br>
    <button @click="send">
      Send
    </button>
    <br>

    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<style scoped lang="postcss"></style>
