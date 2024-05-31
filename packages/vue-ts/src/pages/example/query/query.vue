<script setup lang="ts">
interface Pagination {
  total?: number
  current: number
  size: number
}

const pagination = ref<Pagination>({
  current: 1,
  size: 5,
})

const {
  data,
} = useQuery({
  queryKey: ['example', 'query', 'posts', pagination] as const,
  queryFn: async ({ queryKey }) => {
    const { current, size } = queryKey[3]
    const { data } = await http.request({
      url: '/jsapi/posts',
      params: {
        _page: current,
        _per_page: size,
      },
    })
    return data
  },
  placeholderData: keepPreviousData,
  staleTime: 1000 * 60,
})

const total = computed(() => data.value?.items ?? 0)
const list = computed(() => data.value?.data ?? [])

function updatePagination(e: Event) {
  const value = JSON.parse((e.target as HTMLElement).textContent ?? '{}')
  pagination.value = value
}
</script>

<template>
  <div
    :style="{
      position: 'relative',
      margin: '1em',
      padding: '1em',
      border: '1px solid gray',
    }"
  >
    <button @click="pagination.current = Math.max(pagination.current - 1, 1)">
      prev
    </button> |
    <button @click="pagination.current = Math.min(pagination.current + 1, Math.ceil(total / pagination.size))">
      next
    </button>
    <pre
      :style="{
        margin: '1em',
        padding: '1em',
        border: '1px solid gray',
      }" contenteditable @input="updatePagination($event)"
    >{{ { ...pagination, total } }}</pre>
  </div>

  <ul>
    <li v-for="i, index in list" :key="i.id">
      {{ index }}: {{ i.title }}
    </li>
  </ul>
</template>

<style scoped lang="postcss"></style>
