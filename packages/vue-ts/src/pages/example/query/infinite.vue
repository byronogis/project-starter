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
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
} = useInfiniteQuery({
  queryKey: ['example', 'infinite', 'posts'] as const,
  queryFn: async ({ pageParam }) => {
    const { current, size } = pageParam
    const { data } = await http.request({
      url: '/jsapi/posts',
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
</script>

<template>
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
