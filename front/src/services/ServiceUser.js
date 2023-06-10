import {ServiceXhr} from "./ServiceXhr";

export const ServiceUtilisateur = {
    logIn: async (login, password) => {
        const data = JSON.stringify({login: login, password: password});
        return ServiceXhr.callWithoutAuth("http://localhost:3000/api/v1/user/login", data, "POST");
    },
    register: async (login, password) => {
        const data = JSON.stringify({login: login, password: password});
        return ServiceXhr.callWithoutAuth("http://localhost:3000/api/v1/user/register", data, "POST");
    },
    getAllUsers: async () => {
        return ServiceXhr.callWithAuthNoBody("http://localhost:3000/api/v1/user", "GET");
    },
    getUserById: async (id) => {
        return ServiceXhr.callWithAuthNoBody("http://localhost:3000/api/v1/user/" + id, "GET");
    }
}