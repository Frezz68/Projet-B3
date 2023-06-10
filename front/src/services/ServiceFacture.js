import { ServiceXhr } from "./ServiceXhr";

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
    updateFacture: async (id, idClient, idProduit, quantite) => {
        const data = JSON.stringify({ idClient: idClient, idProduit: idProduit, quantite: quantite });
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/facture/' + id, data, "POST");
    },
    deleteFacture: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/facture/' + id, "DELETE");
    }
}