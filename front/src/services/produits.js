import { ServiceXhr } from "./ServiceXhr";

export const ServiceProduits = {
    getAllProduits: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/produit/', "GET");
    },
}
