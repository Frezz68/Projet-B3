<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isActiveRoute = (path) => {
  return route.path === path;
};
</script>

<template>
  <div class="left-panel">
    <h3>CRM</h3>
    <ul>
        <RouterLink class="decoration" :to="`/home`" :class="{ 'active': isActiveRoute('/home'), 'decoration': !isActiveRoute('/home') }">
          <li class="li" :class="{ 'liRoute': isActiveRoute('/home'), 'li': !isActiveRoute('/home') }">
            🏠 Home
          </li>
        </RouterLink>
      <RouterLink class="decoration" :to="`/produits`" :class="{ 'active': isActiveRoute('/produits'), 'decoration': !isActiveRoute('/produits') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/produits'), 'li': !isActiveRoute('/produits') }">
          🛏️ Produits
        </li>
      </RouterLink>
      <RouterLink class="decoration" :to="`/commandes`" :class="{ 'active': isActiveRoute('/commandes'), 'decoration': !isActiveRoute('/commandes') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/commandes'), 'li': !isActiveRoute('/commandes') }">
          🛒 Commandes
        </li>
      </RouterLink>
      <RouterLink class="decoration" :to="`/factures`" :class="{ 'active': isActiveRoute('/factures'), 'decoration': !isActiveRoute('/factures') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/factures'), 'li': !isActiveRoute('/factures') }">
          📄 Factures
        </li>
      </RouterLink>
      <RouterLink class="decoration" :to="`/clients`" :class="{ 'active': isActiveRoute('/clients'), 'decoration': !isActiveRoute('/clients') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/clients'), 'li': !isActiveRoute('/clients') }">
          👨‍🦰 Clients
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<style scoped>
.left-panel {
    width: 20vw;
    height: 100vh;
    vertical-align: top;
    border-right: 2px solid #3f72b7;

}
.left-panel h3 {
  text-align: center;
  border: 2px solid #3f72b7;
  border-radius: 7px;
  margin: 3px;
  background-color: #ffffff;
  color: #3f72b7;
  font-size: 2rem;
}
.left-panel ul {
  display: inline-block;
  list-style: none;
  text-align: left;
  padding: 3px;
  width: 99%;
  height: auto;
}
.li {
  display: flex;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 5px;
  border-radius: 10px;
  height: 100%;
  font-size: 20px;
  width: 90%;
}

.liRoute {
  display: flex;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 5px;
  border-radius: 7px;
  height: 100%;
  font-size: 20px;
  width: 90%;
  background-color: #3f72b7;
}

.decoration {
  text-decoration: none;
  color: #3f72b7;
}

.active {
  color: #ffffff;
}

</style>