<script setup>
import {ServiceUtilisateur} from "../services/ServiceUser.js";
import {useRouter} from "vue-router";

let login;
let password;

const router = useRouter();
// fonction pour se connecter
const logIn = async () => {
    if(login.trim() !== "" && password.trim() !== "") {
      // appel de la fonction logIn du service ServiceUtilisateur
        ServiceUtilisateur.logIn(login, password)
            .then(async (response) => {
                const result = await response.json();
                if(response.status === 200) {
                    localStorage.setItem("token", result.token)
                    await router.push({ path: '/home' })
                } else {
                    this.error = result.message;
                }
            });
    }
}
</script>

<template>
    <div class="login-container">
        <div class="panneau">
            <div class="login-box">

                <h2>Bienvenue sur notre CRM </h2>
                <label for="user">Nom d'utilisateur </label>
                <input v-model="login" type="text" id="user" required>
                <label for="password">Mot de passe </label>
                <input v-model="password" type="password" id="password" required>
                <button class="button" @click="logIn()">Log In</button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #ffffff;
}

.panneau {
    background-color: #ffffff;
    border: 4px solid #3f72b7;
    color: #3f72b7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgb(63, 114, 183);
    width: 30%;
}

h2 {
    text-align: center;
    color: #3f72b7;
}

.login-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.login-box input[type="text"],
.login-box input[type="password"] {
    width: 50%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: white;
    background-color: #a6c5f6;
    margin-top: 10px;
    border: none;
    border-radius: 3px;
}

@media (max-width: 1000px) {
    .login-box input[type="text"],
    .login-box input[type="password"] {
        width: 95%;
    }
}
.login-box label::after {
    content: "*";
    color: red;
}
.button {
    width: 50%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #3f72b7;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
    border: 2px solid #3f72b7;
}

.button:hover {
    background-color: #FFFFFF;
    color: #3f72b7;
    border: 2px solid #3f72b7;
}


</style>