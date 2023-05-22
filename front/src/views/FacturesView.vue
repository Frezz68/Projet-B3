<script setup>
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import {reactive} from "vue";
import { ServiceFacture } from "../services/ServiceFacture.js";
import LeftPanel from "@/components/LeftPanel.vue";

let factures = reactive([])

const getAllFactures = async () => {
    const response = await ServiceFacture.getAllFactures()

    console.log("response", response)
    if (response.status === 200) {
        const result = await response.json()
        factures.splice(0)
        for (let facture of result) {
            facture.dateEmmission = new Date(facture.dateEmmission).toLocaleDateString()
            facture.datePaiement = new Date(facture.datePaiement).toLocaleDateString()
            factures.push(facture)
        }
        console.log("factures", factures)
    }
}

getAllFactures()
const generatePDF = (facture) => {
    const produitsFacture = [
        {
            id : 1,
            nom : "Produit 1",
            description : "Description 1",
            prix : 10,
            quantite : 2,
            total : 20
        },
        {
            id : 2,
            nom : "Produit 1",
            description : "Description 1",
            prix : 20,
            quantite : 2,
            total : 40
        },
        {
            id : 3,
            nom : "Produit 3",
            description : "Description 3",
            prix : 30,
            quantite : 3,
            total : 60
        }
    ]
    let total = 0
    for (let produit of produitsFacture) {
        total = total + (produit.quantite * produit.prix)
    }
    let totalTVA = total * 1.2
    total = total.toString()
    totalTVA = totalTVA.toString()

    let props = {
        outputType: jsPDFInvoiceTemplate.Save,
        returnJsPDFDocObject: true,
        fileName: "Facture N°" + facture.idFacture + ".pdf",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "https://media.licdn.com/dms/image/C4E0BAQGzIETvvOvn-g/company-logo_200_200/0/1618991133428?e=2147483647&v=beta&t=0fgoUOOHqSxCNeZK_tbcQ58PAgyokk_O9xLpzn1m7vg",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 30, //aspect ratio = width/height
            height: 30,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        stamp: {
            inAllPages: true, //by default = false, just in the last page
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            type: 'JPG', //optional, when src= data:uri (nodejs case)
            width: 20, //aspect ratio = width/height
            height: 20,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "Ynov Nantes",
            address: "20 Bd Général de Gaulle, 44200 Nantes",
            phone: "02 28 44 04 40",
            website: "https://www.ynov.com/campus/nantes/",
        },
        contact: {
            label: "Facture de:",
            name: "Nom : " + facture.Client.nom + " " + facture.Client.prenom,
            address: "Adresse : " + facture.Client.adresse + " " + facture.Client.codePostal + " " + facture.Client.ville,
            phone: "Telephone : " + facture.Client.telephone,
            email: "Email : " + facture.Client.email,
        },
        invoice: {
            label: "Numero de Facture: ",
            num: facture.idFacture,
            invDate: null,
            invGenDate: null,
            headerBorder: false,
            tableBodyBorder: false,
            header: [
                {
                    title: "id",
                    style: {
                        width: 10
                    },
                    value: "id"
                },
                {
                    title: "Produit",
                    style: {
                        width: 30
                    },
                    value: "nom"
                },
                {
                    title: "Description",
                    style: {
                        width: 80
                    },
                    value: "description"
                },
                { title: "Prix", value: "prix"},
                { title: "Quantité", value: "quantite"},
                { title: "Total", value: "total"}
            ],
            table: Array.from(Array(produitsFacture.length), (item, index)=> {
                console.log("index", index)
                console.log("produitsFacture[index]", produitsFacture[index])
                return  [
                    produitsFacture[index].id,
                    produitsFacture[index].nom,
                    produitsFacture[index].description,
                    produitsFacture[index].prix,
                    produitsFacture[index].quantite,
                    produitsFacture[index].total
                ];
            }),
            additionalRows: [{
                col1: 'Total:',
                col2: total,
                col3: '€',
                style: {
                    fontSize: 14 //optional, default 12
                }
            },
                {
                    col1: 'TVA:',
                    col2: '20',
                    col3: '%',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                },
                {
                    col1: 'SubTotal:',
                    col2: totalTVA,
                    col3: '€',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                }],
            invDescLabel: "Invoice Note",
            invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    const pdfObject = jsPDFInvoiceTemplate(props);
}



</script>

<template>
    <!--<button class="button" @click="generatePDF">Générer PDF</button>-->
    <LeftPanel/>
    <div class="Page">

        <div class="Titre">
            <span>Gestions des factures</span>
        </div>

        <div class="Tableau">
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Date d'émission</th>
                    <th>Payé</th>
                    <th>Date de paiement</th>
                    <th>Client</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="facture in factures" :key="id">
                    <td>{{ facture.idFacture }}</td>
                    <td>{{ facture.dateEmmission }}</td>
                    <td>
                        <div class="divImagePayee">
                            <img class="imagePayee" src="../assets/payee.png" v-if="facture.payee == true">
                            <img class="imagePayee" src="../assets/nonPayee.png" v-if="facture.payee == false">
                        </div>
                    </td>
                    <td>{{ facture.datePaiement }}</td>
                    <td>{{ facture.Client.nom }} {{ facture.Client.prenom }}</td>
                    <td >
                        <div class="action">
                            <img class="ImageAction" src="../assets/poubelle.png" @click="deleteProduit(produit.idProduit)">
                            <img class="ImageAction" src="../assets/generatePDF.png" @click="generatePDF(facture)">
                        </div>
                    </td>
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

td:nth-child(1),
td:nth-child(2),
td:nth-child(4),
td:nth-child(6) {
    text-align: center;
}


.TitreRightPanel span {
    margin-left: 10px;
    color: #3f72b7;
    font-size: 1.5rem;
    text-decoration: underline;
}

.ImageAction {
    width: 30px;
    height: 30px;
}


.divImagePayee {
    display: flex;
    justify-content: center;
}
.action {
    display: flex;
    justify-content: space-around;

}

</style>