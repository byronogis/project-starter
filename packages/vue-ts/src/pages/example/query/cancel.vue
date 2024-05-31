<script setup lang="ts">
import {
  bodyHelloAPI,
  pathHelloAPI,
  queryHelloAPI,
} from '~/api/example'

const {
  data,
  isLoading,
  isFetching,
  refetch,
} = useQuery({
  queryKey: ['example', 'query', 'cancel'],
  queryFn: async ({ signal }) => {
    // await new Promise(resolve => setTimeout(resolve, 5000))
    const { data } = await queryHelloAPI({ name: 'cancel' }, { signal })
    return data
  },
  enabled: false,

})

const queryClient = useQueryClient()
function cancel() {
  queryClient.cancelQueries({ queryKey: ['example', 'query', 'cancel'] })
}
</script>

<template>
  <div>
    <button @click="refetch">
      Request
    </button>
    <button @click="cancel">
      Cancel
    </button>

    <p v-if="isLoading">
      loading
    </p>

    <p v-else-if="isFetching">
      fetching
    </p>

    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped lang="postcss"></style>
