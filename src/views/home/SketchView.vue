<template>
  <div class="flex-v wrap">
    <div class="flex-item flex sketch-header">
      <span class="flex-item tools-group">
        <undo/>
        <redo/>
        <i class="divider"></i>
        <pen/>
        <eraser/>
        <color-picker/>
      </span>
      <span class="flex-item tools-group">
        <more/>
      </span>
    </div>
    <div class="flex-main sketch-canvas">Sketch Main</div>
  </div>
</template>

<script lang="ts" setup>
import Pen from './tools/pen/PenButton.vue'
import Eraser from './tools/eraser/EraserButton.vue'
import ColorPicker from './tools/color/ColorButton.vue'
import Undo from './tools/undo/UndoButton.vue'
import Redo from './tools/redo/RedoButton.vue'
import More from './tools/more/MoreOperations.vue'
</script>
<style scoped>
.sketch-header {
  height: 40px;
  align-items: stretch;
  justify-content: space-between;
  background-color: var(--color-bg-dark);
  padding: 0 10px;
}
.tools-group {
  display: flex;
  align-items: center;
}
.sketch-canvas {
  text-align: center;
  line-height: 500px;
}
.divider {
  display: inline-block;
  width: 1px;
  background: #aaa;
  height: 14px;
  margin: 0 10px;
}
</style>