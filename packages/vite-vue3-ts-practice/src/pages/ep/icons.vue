<template>
  <el-row>
    <el-button circle>
      <!-- 目前图标按需导入需要使用插槽以组件方式传入才可使用 -->
      <template #default>
        <i-ep-search />
      </template>
    </el-button>

    <i-ep-search />
    <IEpSearch />
  </el-row>
</template>
