<script setup lang="ts">
import {
  bodyHelloAPI,
  pathHelloAPI,
  queryHelloAPI,
} from '~/api/example'

const requestsInfo = ref([
  {
    api: queryHelloAPI,
    payload: {
      name: 'from query',
    },
  },
  {
    api: bodyHelloAPI,
    payload: {
      name: 'from body',
    },
  },
  {
    api: pathHelloAPI,
    payload: {
      name: 'from path',
    },
  },
])

const data = ref()

async function send(index: number) {
  const {
    api,
    payload,
  } = requestsInfo.value[index]

  try {
    const res = await api(payload)

    console.log(res)
    console.log('----------------------------')
  }
  catch (error) {
    console.error(error)
  }
}

function updatePayload(e: Event, index: number) {
  //
  const value = JSON.parse((e.target as HTMLElement).textContent ?? '{}')

  requestsInfo.value[index].payload = value
}
</script>

<template>
  <div class="page-example-request">
    <div
      v-for="(r, index) in requestsInfo" :key="index"
      :style="{
        position: 'relative',
        margin: '1em',
        padding: '1em',
        border: '1px solid gray',
      }"
    >
      <span>{{ r.api.name }}: </span>

      <button @click="send(index)">
        Send
      </button>

      <pre
        :style="{
          margin: '1em',
          padding: '1em',
          border: '1px solid gray',
        }" contenteditable @input="updatePayload($event, index)"
      >{{ r.payload }}</pre>
    </div>

    <hr>

    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<style scoped lang="postcss"></style>
