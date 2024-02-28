<template>
  <span class="iconfont icon-Undo btn-tool" @click="g.undo"></span>
</template>

<script setup lang="ts">
import { inject } from 'vue';
const g = inject('graph') as any
</script>