<script setup lang="ts">
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
  <a-button type="primary" @click="open('message')">
    message
  </a-button>
  <a-button type="default" @click="open('modal')">
    modal
  </a-button>
  <a-button type="dashed" @click="open('notification')">
    notification
  </a-button>
</template>
