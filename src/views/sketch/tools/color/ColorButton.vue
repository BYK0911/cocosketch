<template>
  <span class="btn-tool color-picker-wrap" @touchstart="drag" @click="showColorPicker">
    <span class="color-grid" :style="{ background: color }"></span>
    <span class="color-picker">
      <el-color-picker
        ref="picker"
        v-model="color"
        show-alpha
        :predefine="colors"
        @change="colorChanged"
      ></el-color-picker>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import colors from './predefine'

const picker = ref()
const g = inject('graph') as any
const color = ref(g.state.pen.color)
const showColorPicker = () => {
  picker.value.show()
}
const colorChanged = (v: string) => g.state.pen.color = v

const drag = (e: TouchEvent) => {
  if (e.touches.length > 1) return
  let x = e.touches[0].pageX
  let y = e.touches[0].pageY

  const drag = (e: TouchEvent) => {
    x = e.touches[0].pageX
    y = e.touches[0].pageY
  }

  const dragend = (): void => {
    window.removeEventListener('touchend', dragend)
    window.removeEventListener('touchmove', drag)

    if (document.elementFromPoint(x, y) === g.canvas) {
      g.emit('drop', { x, y })
    }
  }

  window.addEventListener('touchmove', drag)
  window.addEventListener('touchend', dragend)
}

</script>

<style scoped>
.color-picker-wrap {
  margin-left: 8px;
}
.color-picker {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
}
.color-grid {
  flex: none;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #fff;
  width: 20px;
  height: 20px;
}
</style>