<script lang="ts" setup>
const text = 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
const activeKey = ref(['1', '2'])

watch(activeKey, val => {
  console.log(val)
})

const open = (type: string) => {
  switch (type) {
    case 'message':
      AMessage.info('this is a message.')
      break

    case 'modal':
      AModal.info({
        title: 'This is a notification message',
        content: h('div', {}, [
          h('p', 'some messages...some messages...'),
          h('p', 'some messages...some messages...'),
        ]),
        onOk() {
          console.log('ok')
        },
      })
      break

    case 'notification':
      ANotification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!')
        },
      })
      break

    default:
      break
  }
}
</script>

<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="自动引入的图标">
      <a-space size="large">
        <home-outlined />
        <setting-filled />
        <smile-outlined />
        <sync-outlined spin />
        <smile-outlined :rotate="180" />
        <loading-outlined />
      </a-space>
    </a-collapse-panel>

    <a-collapse-panel key="2" header="自动引入的非组件插件">
      <a-space size="large">
        <a-button type="primary" @click="open('message')">
          message
        </a-button>
        <a-button type="default" @click="open('modal')">
          modal
        </a-button>
        <a-button type="dashed" @click="open('notification')">
          notification
        </a-button>
      </a-space>
    </a-collapse-panel>
  </a-collapse>
</template>
