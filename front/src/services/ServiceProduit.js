import { ServiceXhr } from "./ServiceXhr";

// méthodes pour appeler les services liés aux produits
export const ServiceProduits = {
    getAllProduits: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/', "GET");
    },
    getProduitById: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/' + id, "GET");
    },
    addProduit: async (data) => {
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/produit/', data, "POST");
    },
    updateProduit: async (id, data) => {
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/produit/' + id, data, "PUT");
    },
    deleteProduit: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/' + id, "DELETE");
    }
}
