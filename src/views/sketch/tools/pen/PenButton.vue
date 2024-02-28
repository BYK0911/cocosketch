<template>
  <el-popover
    placement="bottom"
    width="auto"
    @show="g.setMode('pen')"
    :hide-after="0"
  >
    <template #reference>
      <span class="iconfont icon-pen1 btn-tool"></span>
    </template>

    <el-slider :show-tooltip="false" v-model="v" @change="sizeChange" :max="50"/>
    <!-- <div style="padding: 10px 10px 0 10px;">
      <div class="canvas flex-item" style="width: 200px;height:100px; margin-bottom: 10px; background: #f0f0f0"></div>
    </div> -->
  </el-popover>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'

const g = inject('graph') as any
const v = ref(g.state.pen.size)
const sizeChange = (v: number) => g.state.pen.size = v
</script>
