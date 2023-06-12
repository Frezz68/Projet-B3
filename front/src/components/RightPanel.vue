<script setup>
import { useRoute } from 'vue-router'
import {showPanel} from "@/utils"
import {ServiceProduits} from "@/services/ServiceProduit";
import { ServiceClients } from "../services/ServiceClient.js";
import { ServiceFacture } from "../services/ServiceFacture.js";
const route = useRoute()

// initialisation des emits et props
const emit = defineEmits(['refresh']);

const props = defineProps({
    client: Object,
    produit: Object,
    facture: Object
})

// initialisation des variables en fonction de la route
let nameProduit = props.produit ? props.produit.nom :""
let prixProduit = props.produit ? props.produit.prix :""
let quantiteProduit = props.produit ? props.produit.qteStock :""
let descriptionProduit = props.produit ? props.produit.description :""
let imageProduit = props.produit ? props.produit.pathToImage :""

let nomClient = props.client ? props.client.nom : ""
let prenomClient = props.client ? props.client.prenom : ""
let emailClient = props.client ? props.client.email :""
let adresseClient = props.client ? props.client.adresse :""
let codePostalClient = props.client ? props.client.codePostal :""
let villeClient = props.client ? props.client.ville :""
let paysClient = props.client ? props.client.pays :""
let telephoneClient = props.client ? props.client.telephone :""
let dateCreationClient = props.client == undefined ? props.client.dateCreation : new Date()

let idFacture = props.facture ? props.facture.idFacture :""
let dateEmission = props.facture ? new Date(props.facture.dateEmmission).toISOString().slice(0, 10) :""
let payee = props.facture ? props.facture.payee :""
let nomPrenomClient = props.facture ? props.facture.Client.nom + props.facture.Client.prenom :""

// fonction pour sauvegarder les modifications
const save = async () => {
  // en fonction de la route on sauvegarde les modifications
    switch (route.path) {
        case "/produits":
            const dataProduit = JSON.stringify({
                nom: nameProduit,
                prix: prixProduit,
                description: descriptionProduit,
                pathToImage: imageProduit,
                quantite: quantiteProduit
            });
            if (props.produit.idProduit ) {
                const response = await ServiceProduits.updateProduit(props.produit.idProduit, dataProduit)
                if (response.status === 200) {
                    showPanel.value = false
                }
            }else {
                const response = await ServiceProduits.addProduit(dataProduit)
                if (response.status === 201) {
                    showPanel.value = false
                }
            }
            refresh();
            break;
        case "/commandes":
            showPanel.value = !showPanel
            break;
        case "/clients":
            const dataClients = JSON.stringify({
                nom: nomClient,
                prenom: prenomClient,
                email: emailClient,
                adresse: adresseClient,
                codePostal: codePostalClient,
                ville: villeClient,
                pays: paysClient,
                telephone: telephoneClient,
                dateCreation: dateCreationClient,
            });
            console.log(dateCreationClient)
            console.log(dataClients)
            if (props.client.idClient ) {
                const response = await ServiceClients.updateClient(props.client.idClient, dataClients)
                if (response.status === 200) {
                  showPanel.value = false
                }
            }else {
                const response = await ServiceClients.addClient(dataClients)
                if (response.status === 201) {
                    showPanel.value = false
                }
            }
            refresh();
            break;
        case "/factures":
            const dataFacture = JSON.stringify({
                payee: payee
            });
            if (props.facture.idFacture ) {
                const response = await ServiceFacture.updateFacture(props.facture.idFacture, dataFacture)
                if (response.status === 200) {
                    showPanel.value = false
                }
            }
            refresh();
            break;
        default:
            showPanel.value = !showPanel
            break;
    }

}
// fonction pour rafraichir la page
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
        <div class="contenue" v-if="route.path == '/factures'">
            <label for="idFacture">Numéro facture : </label>
            <input v-model="idFacture" type="number" id="idFacture" required disabled><br>
            <label for="dateEmission">Date d'émission : </label>
            <input v-model="dateEmission" type="date" id="dateEmission" required disabled><br>
            <label for="payee">Payé : </label>
            <input v-model="payee" type="checkbox" id="payee" required :disabled="payee"><br>
            <label for="nomPrenomClient">Client :</label>
            <input v-model="nomPrenomClient" type="text" id="nomPrenomClient" required disabled><br>
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
input[type="date"],
input[type="checkbox"],
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