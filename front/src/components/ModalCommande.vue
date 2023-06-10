<script setup>
import {reactive, ref} from "vue";
import { ServiceProduits } from "../services/ServiceProduit.js";
import {showPanel} from "@/utils";
let produitsExistants = reactive([])
let produits = reactive([])
let selectedProduit = reactive([])
let quantite = ref()
let diffStock = ref(0)

const emits = defineEmits(['sendProduit'])
const props = defineProps({
    produitsInFacture: Object
})
const getAllProduit = async () => {
    const response = await ServiceProduits.getAllProduits()
    if (response.status === 200) {
        const result = await response.json()
        produits.splice(0)
        for (let produit of result) {
            const filtredProduit = props.produitsInFacture.filter(produitInFacture => produitInFacture.id === produit.idProduit)
            if (filtredProduit.length === 0){
                produits.push(produit)
            }
        }
    }
}
const closePopUp = () => {
    showPanel.value = false
}

const addProduit = async () => {
    if(quantite.value > 0){
      if (selectedProduit){
          const filtredProduit = produits.filter(produit => produit.idProduit === selectedProduit.idProduit)
          const ObjectProduit = {
              id: filtredProduit[0].idProduit,
              nom: filtredProduit[0].nom,
              qte: quantite.value,
              qteMax: filtredProduit[0].qteStock,
              prixUnitaire: filtredProduit[0].prix,
              modif: false,
          }
          console.log(filtredProduit)
          showPanel.value = false
          emits('sendProduit',ObjectProduit)
      }
    }
}
const checkStock = () => {
    if (quantite.value > selectedProduit.qteStock) {
        quantite.value = selectedProduit.qteStock;
    }
    diffStock.value = selectedProduit.qteStock - quantite.value
}

getAllProduit()
console.log(produits)
</script>

<template>
    <div class="vue-modal">
        <div class="vue-modal-inner">
            <div class="vue-modal-content">
                <h2>Sélectionner un produit :</h2>

                <label for="qte">Produit :</label> <br/>
                <select v-model="selectedProduit">
                   <option v-for="produit in produits" :value="produit">{{produit.nom}}</option>
                </select><br/>
                <label for="qte">Quantité :</label><br/>
                <input id="qte" type="number" v-model="quantite" @input="checkStock" :max="selectedProduit.qteStock" min="0">
                <br>
                <span v-if="selectedProduit.length != 0">En Stock: {{diffStock}}</span> <br>
                <button class="button" type="button" @click="addProduit">Envoyer</button>
                <button class="button" @click="closePopUp">Annuler</button>
            </div>
        </div>
    </div>

</template>

<style scoped>
*,
::before,
::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.vue-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
}

.vue-modal-inner {
    margin: 2rem auto;
    width: 40%;
}

h2 {
    margin-bottom: 20px;
    color: #3f72b7;
}

.vue-modal-content {
    background-color: #ffffff;
    color: #3f72b7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgb(63, 114, 183);
    text-align: center;
}

.vue-modal-content select {
    width: 50%;
    height: 5vh;
    border: 2px solid #3f72b7;
    color: #3f72b7;
    font-size: 1rem;
}

.vue-modal-content input[type="number"] {
    width: 50%;
    height: 5vh;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: white;
    background-color: #a6c5f6;
    margin-top: 10px;
    border: none;
    border-radius: 3px;
}


.button {
    width: 30%;
    padding: 10px;
    margin: 20px;
    background-color: #3f72b7;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
    border: 2px solid #3f72b7;
}

.button:hover {
    background-color: #FFFFFF;
    color: #3f72b7;
    border: 2px solid #3f72b7;
}

</style>