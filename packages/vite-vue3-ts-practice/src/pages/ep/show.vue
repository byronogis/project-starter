<script setup lang="ts">
const showMessage = () => {
  ElMessage('this is a message.')
}
</script>

<template>
  <el-collapse :model-value="['icon', 'component']">
    <el-collapse-item title="自动引入的图标" name="icon">
      <el-row align="middle">
        <el-space size="large">
          <!-- 1 -->
          <el-button circle>
            <!-- 目前图标按需导入需要使用插槽以组件方式传入才可使用 -->
            <template #default>
              <i-ep-search />
            </template>
          </el-button>

          <!-- 2 -->
          <i-ep-search />

          <!-- 3 -->
          <IEpSearch />
        </el-space>
      </el-row>
    </el-collapse-item>

    <el-collapse-item title="自动引入的组件" name="component">
      <el-space size="large">
        <el-button type="primary" plain @click="showMessage()">
          Show message
        </el-button>
      </el-space>
    </el-collapse-item>
  </el-collapse>
</template>
