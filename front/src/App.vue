<script setup>
import { RouterView } from 'vue-router'
import LeftPanel from "@/components/LeftPanel.vue";
import RighPanel from "@/components/RightPanelProduits.vue";
import {reactive} from "vue";
import {showPanel} from "@/utils";

</script>

<template>
  <div class="all">
    <div class="left-panel">
      <LeftPanel/>
    </div>
    <RouterView />
      <div class="test" v-if="showPanel">
          <RighPanel/>
      </div>
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


.test {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
}
</style>
