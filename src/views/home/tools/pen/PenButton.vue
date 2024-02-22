<template>
  <el-popover
    trigger="click"
    placement="bottom"
    width="auto"
  >
    <template #reference>
      <span class="iconfont icon-pen1 btn-tool"></span>
    </template>

    <div style="padding: 10px 10px 0 10px;">
      <div class="canvas flex-item" style="width: 200px;height:100px; margin-bottom: 10px; background: #f0f0f0"></div>
      <el-slider v-model="value1"/>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(1)
</script>

<style scoped>
.sub-title {
  font-size: 12px;
  font-weight: bold;
  line-height: 24px;
}
</style>