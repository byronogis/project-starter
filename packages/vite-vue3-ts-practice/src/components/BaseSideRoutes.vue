<template>
  <el-menu router>
    <el-menu-item
      v-for="route in $router.options.routes"
      :key="route.path"
      :index="route.path"
      :route="route"
    >
      <span>{{ route.path }}</span>
    </el-menu-item>
  </el-menu>
</template>
