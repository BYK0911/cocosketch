<template>
  <div class="header-bar">
    <span class="prepend">
      <slot name="prepend"></slot>
    </span>

    <slot name="default">
      <span style="{ 'text-align': alignment }">{{ title }}</span>
    </slot>

    <span class="append">
      <slot name="append"></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

withDefaults(defineProps<{
  title?: string;
  alignment?: string;
  showBack?: boolean;
}>(),{
  title: '',
  alignment: 'left',
  showBack: false
})

const router = useRouter()
const back = () => router.back()
</script>

<style scoped>
.header-bar {
  display: flex;
  height: 40px;
  padding: 0 30px;
  align-items: center;
  background-color: #00456b;
  color: #f6f7f8;
}
.prepend {
  position: absolute;
  left: 10px;
}
.append {
  position: absolute;
  right: 10px; 
}
</style>