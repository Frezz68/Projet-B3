<script setup>
import { useRoute } from 'vue-router'
import {showPanel} from "@/utils"
import {ServiceProduits} from "@/services/ServiceProduit";
const route = useRoute()

const emit = defineEmits(['refresh']);

const props = defineProps({
    produit: Object,
    page: String
})

let nameProduit = ""
let prixProduit = ""
let quantiteProduit = ""
let descriptionProduit = ""
let imageProduit = ""

let nomClient = ""
let prenomClient = ""
let emailClient = ""
let adresseClient = ""
let codePostalClient = ""
let villeClient = ""
let paysClient = ""
let telephoneClient = ""


if (props.produit) {
    nameProduit = props.produit.nom
    prixProduit = props.produit.prix
    quantiteProduit = props.produit.qteStock
    descriptionProduit = props.produit.description
    imageProduit = props.produit.pathToImage
}

const save = async () => {
    console.log("save", route.path)
    switch (route.path) {
        case "/produits":
            const data = JSON.stringify({
                nom: nameProduit,
                prix: prixProduit,
                description: descriptionProduit,
                pathToImage: imageProduit,
                quantite: quantiteProduit
            });
            if (props.produit.idProduit ) {
                const response = await ServiceProduits.updateProduit(props.produit.idProduit, data)
                if (response.status === 200) {
                    showPanel.value = false
                }
            }else {
                const response = await ServiceProduits.addProduit(data)
                if (response.status === 201) {
                    showPanel.value = false
                }
            }
            refresh();
            break;
        case "/commandes":
            console.log("commandes")
            showPanel.value = !showPanel
            break;
        case "/clients":
            console.log("clients")
            showPanel.value = !showPanel
            break;
        case "/factures":
            console.log("factures")
            showPanel.value = !showPanel
            break;
        default:
            console.log("error")
            showPanel.value = !showPanel
            break;
    }

}
const refresh = () => {
    emit('refresh')
}

</script>

<template>
    <div class="right-panel">
        <slot name="titre"></slot>
        <div class="contenue" v-if="route.path == '/produits'">
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
        <div class="contenue" v-if="route.path == '/clients'">
            <label for="nomClient">Nom : </label>
            <input v-model="nomClient" type="text" id="nomClient" required><br>
            <label for="prenomClient">Prenom : </label>
            <input v-model="prenomClient" type="text" id="prenomClient" required><br>
            <label for="emailClient">Email : </label>
            <input v-model="emailClient" type="email" id="emailClient" required><br>
            <label for="adresseClient">Adresse : </label>
            <input v-model="adresseClient" type="text" id="adresseClient" required><br>
            <label for="codePostalClient">Code postal :</label>
            <input v-model="codePostalClient" type="number" id="codePostalClient" required><br>
            <label for="villeClient">Ville :</label>
            <input v-model="villeClient" type="text" id="villeClient" required><br>
            <label for="paysClient">Pays :</label>
            <input v-model="paysClient" type="text" id="paysClient" required><br>
            <label for="telephoneClient">Telephone :</label>
            <input v-model="telephoneClient" type="number" id="telephoneClient" required><br>
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
    margin-top: 10px;
}

input[type="text"],
input[type="email"],
input[type="number"]{
    width: 90%;
    padding: 10px;
    margin-bottom: 20px;
    color: white;
    background-color: #c6dcff;
    margin-top: 5px;
    border: none;
    border-radius: 3px;
}

label::after {
    content: "*";
    color: red;
}

</style>