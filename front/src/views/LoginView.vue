<script setup>
import {ServiceUtilisateur} from "../services/ServiceUser.js";
import {useRouter} from "vue-router";

let login;
let password;

const router = useRouter();
const logIn = async () => {
    console.log("login", login)
    if(login.trim() !== "" && password.trim() !== "") {
        ServiceUtilisateur.logIn(login, password)
            .then(async (response) => {
                const result = await response.json();
                console.log(result);
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

                <h2>Ha, te revoilà !</h2>
                <h4>Nous sommes si heureux de te revoir !</h4>
                <label for="user">Nom d'utilisateur </label><br>
                <input v-model="login" type="text" id="user" required><br>
                <label for="password">Mot de passe </label><br>
                <input v-model="password" type="password" id="password" required><br>
                    <form @submit.prevent="logIn()">
                <button class="button">Log In</button>
                </form>
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
    background: #644d93;
}

.panneau {
    background-color: #303338;
    color: #7a7b80;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 50%;
    width: 60%;
}


@media (max-width: 1000px) {
    .login-box {
        width: 100%;
    }
}

h2 {
    text-align: center;
    color: white;
}

h4 {
    text-align: center;
}
.login-box input[type="text"],
.login-box input[type="password"] {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: white;
    background-color: #1e1f22;
    margin-top: 10px;
    border: none;
    border-radius: 3px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
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
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #5765f2;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #4d64b9;
}

@media (max-width: 1000px) {
    .button {
        width: 99%;
    }
}

</style>