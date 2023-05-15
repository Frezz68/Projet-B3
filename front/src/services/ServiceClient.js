import { ServiceXhr } from "./ServiceXhr";

export const ServiceClients = {
    getAllClients: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/client/', "GET");
    },
    getClientById: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/client/' + id, "GET");
    },
    addClient: async (nom, prenom, adresse, codePostal, ville, pays, telephone, email) => {
        const data = JSON.stringify({ nom: nom, prenom: prenom, adresse: adresse, codePostal: codePostal, ville: ville, pays: pays, telephone: telephone, email: email });
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/client/', data, "PUT");
    },
    updateClient: async (id, nom, prenom, adresse, codePostal, ville, pays, telephone, email) => {
        const data = JSON.stringify({ nom: nom, prenom: prenom, adresse: adresse, codePostal: codePostal, ville: ville, pays: pays, telephone: telephone, email: email });
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/client/' + id, data, "POST");
    },
    deleteClient: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/client/' + id, "DELETE");
    }
}