<script setup lang="ts">
const inputStart = reactive({
  placeholder: '开始',
})

const inputEnd = reactive({
  placeholder: '结束',
})

// is-active

const separator = ref('To')

const datepickerRangeInput = ref<HTMLDivElement | null>(null)

watch(() => datepickerRangeInput, () => {
  datepickerRangeInput.value?.addEventListener?.('focus', ({ currentTarget }) => {
    //
    console.dir(currentTarget)
  }, { capture: true })
}, {
  immediate: true,
})
</script>

<template>
  <div
    ref="datepickerRangeInput"
    class="el-date-editor el-date-editor--monthrange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger"
  >
    <i class="el-icon el-input__icon el-range__icon">
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
        />
      </svg>
    </i>

    <input
      autocomplete="off"
      name=""
      class="el-range-input"
      v-bind="inputStart"
    >
    <span class="el-range-separator">{{ separator }}</span>

    <input
      autocomplete="off"
      name=""
      class="el-range-input"
      v-bind="inputEnd"
    >

    <i class="el-icon el-input__icon el-range__close-icon el-range__close-icon--hidden">
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
        />
        <path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z" />
      </svg>
    </i>
  </div>
</template>
