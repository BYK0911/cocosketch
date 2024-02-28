<template>
  <div class="flex-v wrap">
    <header-bar show-back>
      <template #prepend>
        <span class="icon-back" @click="back">
          <el-icon><ArrowLeft></ArrowLeft></el-icon>
        </span>
      </template>
      <span class="tools-group">
        <undo/>
        <redo/>
        <i class="divider"></i>
        <pen/>
        <eraser/>
        <color-picker/>
      </span>

      <template #append><more/></template>
    </header-bar>

    <div class="flex-main sketch-canvas" ref="graphRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import HeaderBar from '@/components/header/HeaderBar.vue'
import Pen from './tools/pen/PenButton.vue'
import Eraser from './tools/eraser/EraserButton.vue'
import ColorPicker from './tools/color/ColorButton.vue'
import Undo from './tools/undo/UndoButton.vue'
import Redo from './tools/redo/RedoButton.vue'
import More from './tools/more/MoreOperations.vue'
import { ref, onMounted, provide } from 'vue'
import Graph from './graph'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const g = new Graph()
const graphRef = ref()
const pics = store.pics
const router = useRouter()
const back = () => {
  const graphData = g.getData()
  if (route.params.index) {
    pics[+route.params.index] = graphData
  } else {
    pics.push(graphData)
  }
  router.back()
}

if (route.params.index) {
  g.load(pics[+route.params.index])
}

provide('graph', g)

onMounted(() => {
  g.mount(graphRef.value)
  g.render()
})
</script>
<style scoped>
.tools-group {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.divider {
  display: inline-block;
  width: 1px;
  background: #aaa;
  height: 14px;
  margin: 0 18px;
}
</style>