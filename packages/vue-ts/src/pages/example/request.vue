<script setup lang="ts">
const requestsInfo = ref([
  {
    path: '/api/hello',
    method: 'get',
    payload: {
      params: {
        name: 'from query',
      },
    },
  },
  {
    path: '/api/hello',
    method: 'post',
    payload: {
      data: {
        name: 'from body',
      },
    },
  },
  {
    path: '/api/hello/[name]',
    method: 'get',
  },
])

const data = ref()

interface Data {
  name: string
}

interface Result {
  code: number
  msg: string
  data: string
}

async function send(index: number) {
  const {
    path,
    method,
    payload,
  } = requestsInfo.value[index]

  try {
    const res = await http.request<Data, Result>({
      url: path,
      method,
      ...payload,
    })

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
      <input v-model="r.path" type="text">

      <select v-model="r.method">
        <option v-for="m in ['get', 'post']" :key="m" :value="m">
          {{ m }}
        </option>
      </select>

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
