<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue';
</script>

<template>
  <header>
    <div>
      <AppHeader/>
      <RouterView/>
    </div>
  </header>
</template>

<style >
  ::-webkit-scrollbar {
  width: 3px;
  /* border: 50%; */
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
