import { ServiceXhr } from "./ServiceXhr";

// méthodes pour appeler les services liés aux factures
export const ServiceFacture = {
    getAllFactures: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/facture', "GET");
    },
    getFactureById: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/facture/' + id, "GET");
    },
    createFacture: async (idClient, refProduits, idUser) => {
        const data = JSON.stringify({ idClient: idClient, refProduits: refProduits, idUser: idUser });
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/facture/', data, "POST");
    },
    updateFacture: async (id, data) => {
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/facture/' + id, data, "PUT");
    },
    deleteFacture: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/facture/' + id, "DELETE");
    }
}