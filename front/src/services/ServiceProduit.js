import { ServiceXhr } from "./ServiceXhr";

export const ServiceProduits = {
    getAllProduits: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/', "GET");
    },
    getProduitById: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/' + id, "GET");
    },
    addProduit: async (data) => {
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/produit/', data, "PUT");
    },
    updateProduit: async (id, data) => {
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/produit/' + id, data, "POST");
    },
    deleteProduit: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/' + id, "DELETE");
    }
}
