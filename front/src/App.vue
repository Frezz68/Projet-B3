<script setup>
import {RouterView, useRoute} from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
.all {
  display: flex;
  width: 100vw;
  height: 100vh
}
.left-panel {
  display: inline-block;
  width: 20vw;
  height: 100vh;
  vertical-align: top;
}


.test {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
}
</style>
