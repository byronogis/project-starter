<script setup lang="ts">
const emits = defineEmits(['update:popoverVisible'])

const inputFocus = ref(false)

watchEffect(() => {
  if (inputFocus.value) {
    emits('update:popoverVisible', true)
  } else {
    emits('update:popoverVisible', false)
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="el-input el-input--prefix el-input--suffix el-date-editor el-date-editor--month el-tooltip__trigger el-tooltip__trigger">
    <div
      class="el-input__wrapper"
    >
      <span
        class="el-input__prefix"
      >
        <span class="el-input__prefix-inner">
          <i class="el-icon el-input__icon">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
              />
            </svg>
          </i>
        </span>
      </span>
      <input
        autocomplete="off"
        name=""
        tabindex="0"
        class="el-input__inner"
        type="text"
        :value="$attrs.modelValue"
        :placeholder="$attrs.placeholder as string"
        @change="(e) => $attrs['onUpdate:modelValue']"
        @click="() => emits('update:popoverVisible', true)"
        @blur="() => emits('update:popoverVisible', false)"
      >
      <span
        class="el-input__suffix"
      >
        <span
          class="el-input__suffix-inner"
        />
      </span>
    </div>
  </div>
</template>
