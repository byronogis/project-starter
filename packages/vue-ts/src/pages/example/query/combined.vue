<script setup lang="ts">
interface Pagination {
  total?: number
  current: number
  size: number
}

interface Post {
  title: string
  body: string
  userId: number
}

const pagination = ref<Pagination>({
  current: 1,
  size: 5,
})

const queryClient = useQueryClient()

const {
  data,
  error,
  isError,
  isPending,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ['example', 'combind', 'posts'],
  queryFn: async ({ pageParam }) => {
    const { current, size } = pageParam
    const { data } = await http.request({
      url: `/jsapi/posts`,
      params: {
        _page: current,
        _per_page: size,
      },
    })
    return data.data
  },
  initialPageParam: pagination,
  getNextPageParam: (lastPage, _pages, lastPageParam) => {
    if (lastPage.length === 0) {
      return undefined
    }

    return {
      ...lastPageParam,
      current: lastPageParam.current + 1,
    }
  },
})

const {
  isPending: isMutationPending,
  mutate,
} = useMutation({
  mutationFn: (data: Post) => http.request({
    url: '/jsapi/posts',
    method: 'POST',
    data,
  }),
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ['example', 'combind', 'posts'],
    })
  },
})

const post = ref<Post>({
  title: '',
  body: '',
  userId: 123,
})

function updatePost(e: Event) {
  console.log('updatePost ==> ', (e.target as HTMLElement).textContent)

  const value = JSON.parse((e.target as HTMLElement).textContent ?? '{}')
  Object.assign(post.value, value)
}

function addPost() {
  mutate(post.value)
}
</script>

<template>
  <pre contenteditable @blur="updatePost">{{ post }}</pre>
  <button @click="addPost">
    Add{{ isMutationPending ? 'ing...' : '' }}
  </button>
  <hr>

  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error!.message }}</span>
  <div v-else-if="data">
    <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
    <ul v-for="(page, pageIndex) in data.pages" :key="pageIndex">
      <li v-for="(item, itemIndex) in page" :key="item.id">
        {{ `${pageIndex}_${itemIndex}: ` }}{{ item.title }}
      </li>
    </ul>
    <button
      :disabled="!hasNextPage || isFetchingNextPage"
      @click="() => fetchNextPage()"
    >
      <span v-if="isFetchingNextPage">Loading more...</span>
      <span v-else-if="hasNextPage">Load More</span>
      <span v-else>Nothing more to load</span>
    </button>
  </div>
</template>

<style scoped lang="postcss"></style>
