<script setup lang="ts">
definePageMeta({
  layout: 'primo-primary',
})

const userStore = useUserStore()

const name = computed(() => userStore.name)

// const toast = usePrimoToast()
const confirm = usePrimoDialog()
async function dialog() {
  // toast.toastError('Hello World!')
  const res = await confirm.dialogConfirm({
    message: h('div', { style: { width: '450px' } }, [
      h('b', null, 'Hello World!'),
      h('span', null, 'Hello World!'),
    ]),
    header: 'Hello World!',
    async confirmFn(p) {
      await Utils._.delay(1000)
      return await Utils.HTTP.axios({
        url: '/api/example',
        method: 'GET',
        signal: p.signal,
      })
    },
  })
  console.info(res)
}
</script>

<template>
  <div id="page-index">
    <h1 class="text-8">
      Hello World! {{ name }} {{ userStore.name }}
      <NuxtIcon name="custom:home" @click="dialog" />
    </h1>
  </div>
</template>

<style scoped lang="postcss"></style>
