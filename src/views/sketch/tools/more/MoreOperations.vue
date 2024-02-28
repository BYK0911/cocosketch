<template>
  <span class="btn-tool">
    <el-dropdown>
      <span class="iconfont icon-menu" style="color: #f6f7f8;font-size: 20px;"></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="showBg">
            <i class="iconfont icon-background-f"></i> 背景颜色
          </el-dropdown-item>
          <el-dropdown-item @click="resetViewport">
            <i class="iconfont icon-marquee"></i> 重置视口
          </el-dropdown-item>
          <el-dropdown-item @click="openDrawer">
            <i class="iconfont icon-download"></i> 导出图片
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="color: var(--el-color-danger);" @click="clear">
              <i class="iconfont icon-delete"></i>清空画布
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  
    <span class="color-picker">
      <el-color-picker
        ref="picker"
        v-model="bgColor"
        :predefine="predefine"
        @change="setBg"
        show-alpha
      />
    </span>

    <el-drawer
      v-model="drawer"
      title="保存图片"
      direction="btt"
      size="80%"
    >
      <div class="img-wrap">
        <img :src='src' />
      </div>
    </el-drawer>
  </span>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import predefine from '../color/predefine'

const drawer = ref(false)
const src = ref('')
const g = inject('graph') as any;
const picker = ref()
const bgColor = ref(g.backgroundColor)
const setBg = (v: string) => g.backgroundColor = v
const showBg = () => picker.value.show()
const resetViewport = () => g.resetViewport()
const clear = () => g.clear()
const openDrawer = () => {
  drawer.value = true
  src.value = g.canvas.toDataURL()
}
</script>

<style scoped>
.color-picker {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
}
.img-wrap img {
  max-width: 100%;
}
</style>
