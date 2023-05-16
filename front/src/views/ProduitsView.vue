<script setup>
import { ServiceProduits } from "../services/ServiceProduit.js";
import {reactive} from "vue";
import {showPanel} from "@/utils";
import LeftPanel from "@/components/LeftPanel.vue";
import RightPanel from "@/components/RightPanelProduits.vue";

let produits = reactive([])



const getAllProduits = async () => {
  const response = await ServiceProduits.getAllProduits()
  if (response.status === 200) {
    const result = await response.json()
    produits.splice(0)
    for (let produit of result) {
      produits.push(produit)
    }
  }
}

getAllProduits()

</script>

<template>
  <div class="test" v-if="showPanel">
      <RightPanel>
          <template v-slot:titre>
              <div class="TitreRightPanel">
                  <span>Création d'un produit</span>
              </div>
          </template>
      </RightPanel>/
  </div>
  <LeftPanel/>
  <div class="Page">

    <div class="Titre">
      <span>Gestions des produits</span>
    </div>

    <div class="createButton">
      <img @click="showPanel = true" src="../assets/plus.png" alt="créer"/>
    </div>

    <div class="Tableau">
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produit in produits" :key="id">
            <td>
                <img class="ImageTableau" :src="produit.pathToImage">
            </td>
            <td>{{ produit.nom }}</td>
            <td>{{ produit.description }}</td>
            <td>{{ produit.prix }}</td>
            <td>{{ produit.qteStock }}</td>
          </tr>
        </tbody>
      </table>

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

td:nth-child(4):after {
  content: " €";
}

.TitreRightPanel span {
    margin-left: 10px;
    color: #3f72b7;
    font-size: 1.5rem;
    text-decoration: underline;
}

.ImageTableau {
    width: 20%;
    height: auto;
}
</style>
