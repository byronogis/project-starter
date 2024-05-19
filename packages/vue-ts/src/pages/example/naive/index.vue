<script setup lang="ts">
import type { AvatarGroupOption } from 'naive-ui'

const avatarGroupProps = ref({
  max: 2,
  options: [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
  ] as unknown as AvatarGroupOption[],
})

function createDropdownOptions(options: Array<{ name: string, src: string }>) {
  return options.map(option => ({
    key: option.name,
    label: option.name,
  }))
}

const message = useMessage()
</script>

<template>
  <n-card>
    avatar:
    <n-space vertical>
      <n-avatar
        bordered
        :style="{
          color: 'yellow',
          backgroundColor: 'red',
        }"
      >
        M
      </n-avatar>

      <n-avatar-group v-bind="avatarGroupProps">
        <template #avatar="{ option: { name } }">
          <n-avatar>{{ name }}</n-avatar>
        </template>
        <template #rest="{ options: restOptions, rest }">
          <n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
            <n-avatar>+{{ rest }}</n-avatar>
          </n-dropdown>
        </template>
      </n-avatar-group>
    </n-space>

    button:
    <n-space vertical>
      <n-button type="primary" @click="message.info('Clicked')">
        Click
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped lang="postcss"></style>
