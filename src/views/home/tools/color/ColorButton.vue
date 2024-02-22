<template>
  <span class="btn-tool color-picker">
    <el-color-picker
      v-model="color"
      size="small"
      style="vertical-align: middle;"
      show-alpha
      :predefine="colors"
    ></el-color-picker>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const color = ref('#000')
const colors = [
  '#000000',
  '#00456b',
  '#483D8B',
  '#228B22',
  '#1E90FF',
  '#00BFFF',
  '#99cc33',
  '#7FFF00',
  '#7FFFD4',
  '#f0f0f0',

  '#9400d3',
  '#A52A2A',
  '#B22222',
  '#DC143C',
  '#D2691E',
  '#B8860B',
  '#FF8C00',
  '#FFE4C4',
  '#FAEBD7',
  '#FFFAF0',

  '#FF1493',
  '#FFC0CB',
  '#F0F8FF',
]
</script>

<style scoped>
.color-picker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
.color-picker .el-color-picker__trigger,
.color-picker .el-color-picker__color-inner {
  border: none;
}
.color-picker .el-color-picker__icon {
  display: none;
}
</style>