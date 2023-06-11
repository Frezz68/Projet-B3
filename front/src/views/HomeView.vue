<script setup>
import {showPanel} from "@/utils";
import LeftPanel from "@/components/LeftPanel.vue";
import RightPanel from "@/components/RightPanel.vue";
import {reactive} from "vue";
import {ServiceFacture} from "@/services/ServiceFacture";
import {ServiceClients} from "@/services/ServiceClient";

// initialisation des variables reactive
let factures = reactive([])
let facturesSemaine = reactive([])
let clients = reactive([])
// initialisation des variables pour les données du mois
let nbFacturesImpayéeSemaine = 0
let CASemaine = 0
let NewClientsSemaine = 0
let dateSemaineAvant = new Date()
dateSemaineAvant.setDate(1)
dateSemaineAvant = new Date(dateSemaineAvant).toLocaleDateString()

// fonction pour récupérer toutes les factures
const getAllFactures = async () => {
    const response = await ServiceFacture.getAllFactures()
    if (response.status === 200) {
        const result = await response.json()
        factures.splice(0)
        for (let facture of result) {
            facture.dateEmmission = new Date(facture.dateEmmission).toLocaleDateString()
            facture.datePaiement = new Date(facture.datePaiement).toLocaleDateString()
            factures.push(facture)
        }
    }
    getFacturesSemaine()
}

// fonction pour récupérer tous les clients
const getAllClients = async () => {
    const response = await ServiceClients.getAllClients()
    if (response.status === 200) {
        const result = await response.json()
        clients.splice(0)
        for (let client of result) {
            client.dateCreation = new Date(client.dateCreation).toLocaleDateString()
            clients.push(client)
            if (client.dateCreation >= dateSemaineAvant)
            {
                NewClientsSemaine += 1
            }
        }
    }
}

// fonction pour récupérer les factures de la semaine
const getFacturesSemaine = async () => {
    for (let facture of factures) {
        if (facture.dateEmmission >= dateSemaineAvant)
        {
            facturesSemaine.push(facture)
        }
    }
    getFacturesImpayeeAndCASemaine()
}

// fonction pour récupérer les factures impayées et le CA de la semaine
const getFacturesImpayeeAndCASemaine = async () => {
    for (let facture of facturesSemaine) {
        if (facture.payee == false)
        {
            nbFacturesImpayéeSemaine += 1
        } else {
            let total = 0
            for (let produit of facture.produits) {
                total = total + (produit.quantite * produit.produit.prix)
            }
            CASemaine += total
        }
    }
}

// fonction pour rafraichir les données de la page
getAllFactures()
getAllClients()


</script>

<template>
    <LeftPanel/>
    <div class="Page">

        <div class="Titre">
            <span>Données du mois :</span>
        </div>
        <div class="row">
            <div class="taille">
                <div class="Section">
                    <span class="Intitule">Nouvelle commande :</span>
                    <span class="Valeur">{{ facturesSemaine.length }}</span>
                </div>
            </div>
            <div class="taille">
                <div class="Section">
                    <span class="Intitule">Chiffre d'affaire de la semaine :</span>
                    <span class="Valeur">{{ CASemaine }} €</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="taille">
                <div class="Section">
                    <span class="Intitule">Commande impayé :</span>
                    <span class="Valeur">{{ nbFacturesImpayéeSemaine }}</span>
                </div>
            </div>
            <div class="taille">
                <div class="Section">
                    <span class="Intitule">Nouveau Client :</span>
                    <span class="Valeur">{{ NewClientsSemaine }}</span>
                </div>
            </div>
        </div>

    </div>
    <div class="test" v-if="showPanel">
        <RightPanel/>
    </div>

</template>

<style scoped>

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

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 5vh;
  justify-content: space-evenly;
}

.taille {
  display: flex;
  width: 30vw;
  height: 20vh;
  background-color: #ffffff;
  border-radius: 10px;
  border : 3px solid #3f72b7;

}

.Section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.Intitule {
  margin: 10px;
  height: auto;
  display: flex;
  justify-content: start;
}

.Valeur {
  height: auto;
  display: flex;
  justify-content: end;
  position: absolute;
  bottom: 4px;
  right: 4px;
}

span {
  color: #3f72b7;
  font-size: 1.2rem;
}

</style>