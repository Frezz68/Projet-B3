<script setup>
import jsPDFInvoiceTemplate from "jspdf-invoice-template";

const generatePDF = () => {
    const pdfObject = jsPDFInvoiceTemplate(props);
    console.log(pdfObject)
}

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
        name: "Client Name",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
    },
    invoice: {
        label: "Numero de Facture: ",
        num: 19,
        invDate: "Date de Facture: 02/02/2021 10:17",
        invGenDate: "Date de paiement: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
            {
                title: "id",
                style: {
                    width: 10
                }
            },
            {
                title: "Produit",
                style: {
                    width: 30
                }
            },
            {
                title: "Description",
                style: {
                    width: 80
                }
            },
            { title: "Prix"},
            { title: "Quantité"},
            { title: "Total"}
        ],
        table: Array.from(Array(10), (item, index)=>([
            index + 1,
            "KC",
            "Meilleur équipe",
            100000,
            1,
            100000
        ])),
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

</script>

<template>
    <button class="button" @click="generatePDF">Générer PDF</button>

</template>

<style scoped>

</style>