<script setup>
import { RouterView } from 'vue-router'
import LeftPanel from "@/components/LeftPanel.vue";
</script>

<template>
  <div class="all">
    <div class="left-panel">
      <LeftPanel/>
    </div>
    <RouterView />
  </div>
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

</style>
