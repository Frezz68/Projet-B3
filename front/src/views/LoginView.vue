<script setup>

</script>

<template>
    <div class="login-container">
        <div class="panneau">
            <div class="login-box">
                <h2>Ha, te revoilà !</h2>
                <h4>Nous sommes si heureux de te revoir !</h4>
                <label for="user">Nom d'utilisateur </label>
                <input v-model="username" type="text" id="user" required><br>
                <label for="password">Mot de passe </label>
                <input v-model="password" type="password" id="password" required><br>
                <button class="button" v-on:click="login">Log In</button>
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

.login-box {
    display: inline-block;
    width: 60%;
    vertical-align: top;
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
    width: 80%;
    padding: 10px;
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
    width: 85%;
    padding: 10px;
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

.QRCode-box {
    display: inline-block;
    width: 40%;
    vertical-align: top;
}

@media (max-width: 1000px) {
    .QRCode-box {
        display: none;
    }
}

.QRCode-box img {
    margin-top: 5%;
    margin-left: 30%;
    width: 40%;
    height: auto;
}


</style>