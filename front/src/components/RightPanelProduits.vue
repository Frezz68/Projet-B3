<script setup>
import { useRoute } from 'vue-router';
import {showPanel} from "@/utils";
const route = useRoute();

const isActiveRoute = (path) => {
    return route.path === path;
};
</script>

<template>
    <div class="right-panel">

        <button @click="showPanel = !showPanel">Fermer le panneau</button>
    </div>
</template>

<style scoped>

.right-panel {
    height: 100%;
    width: 30%;
    background-color: #ffffff;
    border-right: 2px solid #3f72b7;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
}

</style>