<script setup>
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import {reactive} from "vue";
import { ServiceFacture } from "../services/ServiceFacture.js";

let factures = reactive([])
let facture = reactive({})

const getAllFactures = async () => {
    const response = await ServiceFacture.getAllFactures()

    console.log("response", response)
    if (response.status === 200) {
        const result = await response.json()
        factures.splice(0)
        for (let facture of result) {
            factures.push(facture)
        }
        console.log("factures", factures)
    }
}

const getFactureById = async (id) => {
    const response = await ServiceFacture.getAllFactures()

    console.log("response", response)
    if (response.status === 200) {
        facture = null
        facture = await response.json()
        console.log("facture", facture)
        console.log("factureid", facture[0].idFacture)
        console.log("length", facture[0].refProduit.length)
    }

}
getAllFactures()
getFactureById(1)
const generatePDF = () => {
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
    let props = {
        outputType: jsPDFInvoiceTemplate.Save,
        returnJsPDFDocObject: true,
        fileName: "TestPDF",
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
            name: "Nom : " + factures[0].Client.nom + " " + factures[0].Client.prenom,
            address: "Adresse : " + factures[0].Client.adresse + " " + factures[0].Client.codePostal + " " + factures[0].Client.ville,
            phone: "Telephone : " + factures[0].Client.telephone,
            email: "Email : " + factures[0].Client.email,
        },
        invoice: {
            label: "Numero de Facture: ",
            num: factures[0].idFacture,
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
                col2: '100,000.50',
                col3: 'ALL',
                style: {
                    fontSize: 14 //optional, default 12
                }
            },
                {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                },
                {
                    col1: 'SubTotal:',
                    col2: '116,199.90',
                    col3: 'ALL',
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
    console.log("table", props.invoice.table)

    const pdfObject = jsPDFInvoiceTemplate(props);
    console.log(pdfObject)
}



</script>

<template>
    <button class="button" @click="generatePDF">Générer PDF</button>

</template>

<style scoped>

</style>