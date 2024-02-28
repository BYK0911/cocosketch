<template>
  <div class="wrap flex-v" @touchmove.prevent>
    <header-bar title="我的作品">
      <template #append>
        <span class="btn-tool" @click="toSketch()">+</span>
      </template>
    </header-bar>
    <div v-if="pics.length" class="flex-main gallery">
      <img class="image" :src="src" v-for="(src, i) in pics" :key="i" @click="toSketch(i)"/>
    </div>
    <div v-else class="flex-main no-data">暂无作品</div>
  </div>
</template>
<script setup lang="ts">
import HeaderBar from '@/components/header/HeaderBar.vue'
import store from '@/store'
import { computed } from 'vue';
import Graph from '../sketch/graph';
import { useRouter } from 'vue-router';

const router = useRouter()
const g = new Graph()
const pics = computed(() => store.pics.map(p => {
  g.load(p)
  g.drawFrame()
  return g.canvas.toDataURL()
}))
const toSketch = (index?: number) => {
  router.push({ name: 'sketch', params: { index } })
}
</script>

<style scoped>
.gallery {
  padding: 2px;
}
.image {
  float: left;
  box-sizing: border-box;
  width: calc(50% - 4px);
  margin: 2px;
  border: 1px solid #ddd;
  border-radius: 3px;
  text-align: center;
  line-height: 300px;
}
.no-data {
  line-height: 300px;
  text-align: center;
  color: #aaa;
}
</style>