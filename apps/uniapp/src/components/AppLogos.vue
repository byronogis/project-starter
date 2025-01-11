<template>
  <view class="inline-flex cursor-default text-2xl font-300">
    <view
      class="flex flex-col items-center @hover:(drop-shadow-md drop-shadow-color-green-500)"
    >
      <image class="inline-block h-18 w-18" src="/static/logo.svg" />
      <text class="mt--2 text-green-500">
        uni-helper
      </text>
    </view>
    <view
      class="i-carbon-add mx-4 my-auto transform text-3xl text-gray-400 transition-all-500 @hover:rotate-135"
    />
    <view class="flex flex-col @hover:(drop-shadow-md drop-shadow-color-purple-500)">
      <image class="inline-block h-18 w-18" src="/static/vite.png" />
      <text class="mt--2 text-purple-500">
        Vite
      </text>
    </view>
  </view>
</template>
