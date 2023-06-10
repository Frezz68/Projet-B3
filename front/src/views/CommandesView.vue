<script setup>
import {showCreateCommande, showPanel} from "@/utils";
import LeftPanel from "@/components/LeftPanel.vue";
import {reactive, ref} from "vue";
import Modal from "@/components/ModalCommande.vue";
import {ServiceClients} from "@/services/ServiceClient";
import {ServiceFacture} from "@/services/ServiceFacture";

let lstClients = reactive([])
let selectedIdClient = reactive([])
let produitsFacture = reactive([])
let modifValue= ref()
let isModif = true;
let diffStock = ref(0)
const createCommande = () => {
    showCreateCommande.value = !showCreateCommande.value
}
const init = async () => {
    showCreateCommande.value = false
    const response = await ServiceClients.getAllClients();
    if (response.status === 200) {
        const result = await response.json()
        lstClients.splice(0)
        for (let client of result) {
            lstClients.push(client)
        }
    }
    produitsFacture.splice(0)
}
const addProduit = (produit) => {
    const tmp = produitsFacture.find(produitFacture => produitFacture.id === produit.id)
    if(tmp){
        tmp.qte += produit.qte
    }else {
        produitsFacture.push(produit)
    }
}
const afficherEdition = (id) => {
    const tmp = produitsFacture.find(produitFacture => produitFacture.id === id)
    if(tmp){
        if(isModif){
            isModif = !isModif
            tmp.modif = !tmp.modif
            modifValue.value = tmp.qte
            diffStock.value = tmp.qteMax - tmp.qte
        }
    }
}
const editProduit = (id) => {
    const tmp = produitsFacture.find(produitFacture => produitFacture.id === id)
    console.log(tmp)
    if(tmp){
        isModif = !isModif
        if(tmp.qteMax < modifValue.value){
            tmp.qte = modifValue.value
        }
        tmp.modif = !tmp.modif
    }
}
const deleteProduit = (id) => {
    const tmp = produitsFacture.find(produitFacture => produitFacture.id === id)
    if(tmp){
        produitsFacture.splice(produitsFacture.indexOf(tmp), 1)
    }
}
const checkStock = (produit) => {
    console.log(modifValue)
    console.log(produit.qteMax)
    if (modifValue.value > produit.qteMax){
        modifValue.value = produit.qteMax;
    }
    diffStock.value = produit.qteMax - modifValue.value
}

const createFacture = async () => {
    const response = await ServiceFacture.createFacture(selectedIdClient,produitsFacture,1)
    console.log(response)
    if (response.status === 201) {
        init()
    }
}

init()

</script>

<template>
    <Modal v-if="showPanel" :produits-in-facture="produitsFacture" @sendProduit="addProduit"></Modal>
    <LeftPanel/>
    <div class="Page">
        <div class="Titre">
            <span>Création d'une commande</span>
        </div>
        <div class="firstCreateButton" v-if="!showCreateCommande">
                <img @click="createCommande" class="imgCreateCommande" v-if="!showCreateCommande" src="../assets/panier.png" alt="créer"/>
        </div>
        <div class="createButton" v-if="showCreateCommande">
            <img @click="showPanel = true" src="../assets/plus.png" alt="créer"/>
        </div>
        <div  class="selectClient">
            <label for="idClient" v-if="showCreateCommande">Client :</label>
            <select id="idClient" v-if="showCreateCommande" v-model="selectedIdClient">
                <option v-for="client in lstClients" :value="client.idClient">{{ client.nom }} {{client.prenom}}</option>
            </select>
        </div>

        <div class="Tableau" v-if="showCreateCommande">
            <table>
                <thead>
                <tr>
                    <th>Nom du Produit</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire</th>
                    <th>Prix Total</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="produit in produitsFacture">
                    <td>{{ produit.nom }}</td>
                    <td v-if="!produit.modif">{{ produit.qte }}</td>
                    <td v-else><input type="number" v-model="modifValue" @input="checkStock(produit)" @keyup.enter="editProduit(produit.id)" ><span>En Stock: {{diffStock}}</span></td>
                    <td>{{ produit.prixUnitaire }}</td>
                    <td>{{ produit.qte*produit.prixUnitaire }}</td>
                    <td>
                        <div class="action">
                            <img class="ImageAction" src="../assets/poubelle.png" @click="deleteProduit(produit.id)">
                            <img class="ImageAction" src="../assets/editer.png" @click="afficherEdition(produit.id)">
                        </div>
                    </td>

                </tr>
                <tr v-if="produitsFacture.length == 0">
                    <td colspan="5">Aucun produit</td>
                </tr>
                </tbody>
            </table>
            <button v-if="showCreateCommande" @click="init()" class="closeBtn">Annuler</button>
            <button v-if="showCreateCommande" @click="createFacture()" class="SaveBtn">Valider</button>
        </div>
    </div>
</template>

<style scoped>
.left-panel {
    display: inline-block;
    width: 20vw;
    height: 100vh;
    vertical-align: top;
}

.Page {
    display: inline-block;
    width: 79vw;
    height: 100vh;
}

.Titre {
    display: flex;
    margin-top: 5vh;
    margin-left: 5vh;
}

.Titre span {
    color: #3f72b7;
    font-size: 1.5rem;
    text-decoration: underline;
}
.test {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
}

.createButton {
    display: flex;
    position: absolute;
    right: 4vh;
    top: 4vh;
    height: 5vh;
    width: auto;
}

table {
    border-collapse: collapse;
    width: 94%;
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: #333;
    margin: 3%;
}

th, td {
    padding: 10px;
    border: 1px solid #ddd;
}

th {
    background-color: #739cd3;
    font-weight: bold;
    color: white;
}

tr:nth-child(even) {
    background-color: #c4d0e0;
}

tr:hover {
    background-color: #a6c5f6;
}

td:nth-child(4),
td:nth-child(5) {
    text-align: right;
}
td:nth-child(1),
td:nth-child(6) {
    text-align: center;
}


td:nth-child(4):after {
    content: " €";
}

.TitreRightPanel span {
    margin-left: 10px;
    color: #3f72b7;
    font-size: 1.5rem;
    text-decoration: underline;
}

.ImageProduit {
    width: 100%;
    height: 100%;
}

.ImageAction {
    width: 30px;
    height: 30px;
}

.imageTableau {
    width: 50px;
}

.action {
    display: flex;
    justify-content: space-around;

}

.firstCreateButton {
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;
    justify-content: center;
}

.imgCreateCommande {
    width:  auto;
    height: 25%;
    display: flex;
}

.closeBtn {
    position: absolute;
    right: 8vw;
    bottom: 0;
    height: 5vh;
    width: 7vw;
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
    width: 7vw;
}

.selectClient {
    margin-left: 3%;
    margin-top: 3vh;
    width: auto;
    height: 5vh;
    color: #3f72b7;
}

.selectClient select {
    margin-left: 10px;
    width: 20vw;
    height: 4vh;
    border: 2px solid #3f72b7;
    color: #3f72b7;
    font-size: 1rem;
    padding-left: 5px;
}

</style>