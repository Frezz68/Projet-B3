import { ServiceXhr } from "./ServiceXhr";

export const ServiceProduits = {
    getAllProduits: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/', "GET");
    },
    getProduitById: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/' + id, "GET");
    },
    addProduit: async (nom, prix, description, image, qteStock) => {
        const data = JSON.stringify({ nom: nom, prix: prix, description: description, pathToImage: image, quantite: qteStock });
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/produit/', data, "PUT");
    },
    updateProduit: async (id, nom, prix, description, image, qteStock) => {
        const data = JSON.stringify({ nom: nom, prix: prix, description: description, pathToImage: image, quantite: qteStock });
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/produit/' + id, data, "POST");
    },
    deleteProduit: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/' + id, "DELETE");
    }
}
