<template>
  <el-popover
    placement="bottom"
    width="auto"
    :hide-after="0"
  >
    <template #reference>
      <span class="iconfont icon-eraser btn-tool" @click="show"></span>
    </template>

    <el-slider :show-tooltip="false" v-model="v" @change="sizeChange"/>
    <!-- <div style="padding: 10px 10px 0 10px;">
      <div class="canvas flex-item" style="width: 200px;height:100px; margin-bottom: 10px; background: #f0f0f0"></div>
    </div> -->
  </el-popover>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'

const g = inject('graph') as any
const v = ref(g.state.eraser.size)
const sizeChange = (v: number) => g.state.eraser.size = v
const show = () => g.setMode('eraser')
</script>
