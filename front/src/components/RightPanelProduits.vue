<script setup>
import { useRoute } from 'vue-router'
import {showPanel} from "@/utils"
const route = useRoute()

let nameProduit = ""
let prixProduit = ""
let quantiteProduit = ""
let descriptionProduit = ""
let imageProduit = ""

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
        <slot name="titre"></slot>
        <div class="contenue" v-if="route = '/Produits' ">
            <label for="nameProduit">Nom du produit : </label>
            <input v-model="nameProduit" type="text" id="nameProduit" required><br>
            <label for="prixProduit">Prix du produit : </label>
            <input v-model="prixProduit" type="number" id="prixProduit" required><br>
            <label for="quantiteProduit">Quantite du produit : </label>
            <input v-model="quantiteProduit" type="number" id="quantiteProduit" required><br>
            <label for="descriptionProduit">Description du produit : </label>
            <input v-model="descriptionProduit" type="text" id="descriptionProduit" required><br>
            <label for="imageProduit">Insérer l'image du produit</label>
            <input v-model="imageProduit" type="text" id="imageProduit" required><br>
        </div>
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

.contenue {
    margin-left: 10px;
    margin-top: 30px;
}

input[type="text"],
input[type="number"]{
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    color: white;
    background-color: #c6dcff;
    margin-top: 10px;
    border: none;
    border-radius: 3px;
}

label::after {
    content: "*";
    color: red;
}

</style>