<script setup lang="ts">
interface Post {
  title: string
  body: string
  userId: number
}

const queryClient = useQueryClient()

const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: (data: Post) => http.request({
    url: '/jsapi/posts',
    method: 'POST',
    data,
  }),
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ['example', 'query', 'posts'],
    })
  },
})

function addPost() {
  mutate({
    title: `Do Laundry ${Date.now()}`,
    body: 'Do the laundry',
    userId: 123,
  })
}
</script>

<template>
  <span v-if="isPending">Adding post...</span>
  <span v-else-if="isError">An error occurred: {{ error!.message }}</span>
  <span v-else-if="isSuccess">Post added!</span>
  <button @click="addPost">
    Create Post
  </button>
</template>
