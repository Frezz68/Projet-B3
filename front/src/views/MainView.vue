<script setup>
import LeftPanel from "@/components/LeftPanel.vue";
import RighPanel from "@/components/RightPanelProduits.vue";
import {showPanel} from "@/utils";
import {RouterView} from "vue-router";

</script>

<template>
    <div class="all">
        <div class="left-panel">
            <LeftPanel/>
        </div>

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
