<script setup lang="ts">
/**
 * 应用生命周期
 * https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle
 */
onLaunch(() => {
  console.info('[env]', import.meta.env)

  useUserStore().startSession()
})
</script>

<style>
page:has(.disable-scroll) {
  overflow: hidden;
}
</style>
