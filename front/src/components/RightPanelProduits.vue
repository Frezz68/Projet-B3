<script setup>
import { useRoute } from 'vue-router'
import {showPanel} from "@/utils"
const route = useRoute()

const save = async () => {
    console.log("save", route.path)
    switch (route.path) {
        case "/Produits":
            console.log("produits")
            showPanel.value = false
            break;
        case "/Commandes":
            console.log("commandes")
            showPanel.value = !showPanel
            break;
        case "/Clients":
            console.log("clients")
            showPanel.value = !showPanel
            break;
        case "/Factures":
            console.log("factures")
            showPanel.value = !showPanel
            break;
        default:
            console.log("error")
            showPanel.value = !showPanel
            break;
    }

}
</script>

<template>
    <div class="right-panel">
        <slot name="slot1"></slot>
        <slot name="slot2"></slot>
        <button class="closeBtn" @click="showPanel = false">Fermer</button>
        <button class="SaveBtn" @click="save()">Save</button>
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

.closeBtn {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5vh;
    width: 10vw;
    margin: 5px;
    border: 2px solid #3f72b7;
    background: #ffffff;
    color: #3f72b7;
}

.SaveBtn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
    background: #3f72b7;
    color: #ffffff;
    border: none;
    height: 5vh;
    margin: 5px;
    width: 10vw;
}

</style>