<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
</script>

<template>
    <div>
      <AppHeader />
      <RouterView />
      <el-divider></el-divider>
      <AppFooter/>
    </div>
</template>

<style >
.el-table .cell {
  word-break: normal;
}

::-webkit-scrollbar {
  width: 3px;
}



::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
