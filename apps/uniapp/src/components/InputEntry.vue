<script setup lang="ts">
const {
  user,
} = useUserStore()

const name = computed({
  get: () => user.value.name ?? '',
  set: value => user.value.name = value,
})
function go() {
  if (name.value) {
    uni.navigateTo({
      url: `/pages/hi?name=${name.value}`,
    })
  }
}
</script>

<template>
  <view>
    <view
      class="m-auto m-t-5 w-250px border border-gray-200 rounded bg-transparent px-4 py-2 text-center dark:border-gray-700"
    >
      <input
        v-model="name"
        placeholder="What's your name?"
        type="text"
        autocomplete="off"
        class="mr-0 w-full"
      >
    </view>
    <view>
      <wd-button
        :disabled="!name"
        @click="go"
      >
        <view class="i-custom:home size-10" /> GO
      </wd-button>
    </view>
  </view>
</template>
