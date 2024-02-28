<template>
  <span class="iconfont icon-Redo btn-tool" @click="g.redo"></span>
</template>

<script setup lang="ts">
import { inject } from 'vue';
const g = inject('graph') as any
</script>