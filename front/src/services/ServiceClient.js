import { ServiceXhr } from "./ServiceXhr";

export const ServiceClients = {
    getAllClients: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/client/', "GET");
    },
    getClientById: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/client/' + id, "GET");
    },
    addClient: async (data) => {
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/client/', data, "POST");
    },
    updateClient: async (id, data) => {
        return ServiceXhr.callWithAuth('http://localhost:3000/api/v1/client/' + id, data, "PUT");
    },
    deleteClient: async (id) => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:3000/api/v1/client/' + id, "DELETE");
    }
}