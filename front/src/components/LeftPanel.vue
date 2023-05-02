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
        <RouterLink class="decoration" :to="`/Home`" :class="{ 'active': isActiveRoute('/Home'), 'decoration': !isActiveRoute('/Home') }">
          <li class="li" :class="{ 'liRoute': isActiveRoute('/Home'), 'li': !isActiveRoute('/Home') }">
            🏠 Home
          </li>
        </RouterLink>
      <RouterLink class="decoration" :to="`/Produits`" :class="{ 'active': isActiveRoute('/Produits'), 'decoration': !isActiveRoute('/Produits') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/Produits'), 'li': !isActiveRoute('/Produits') }">
          🛏️ Produits
        </li>
      </RouterLink>
      <RouterLink class="decoration" :to="`/Commandes`" :class="{ 'active': isActiveRoute('/Commandes'), 'decoration': !isActiveRoute('/Commandes') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/Commandes'), 'li': !isActiveRoute('/Commandes') }">
          🛒 Commandes
        </li>
      </RouterLink>
      <RouterLink class="decoration" :to="`/Factures`" :class="{ 'active': isActiveRoute('/Factures'), 'decoration': !isActiveRoute('/Factures') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/Factures'), 'li': !isActiveRoute('/Factures') }">
          📄 Factures
        </li>
      </RouterLink>
      <RouterLink class="decoration" :to="`/Clients`" :class="{ 'active': isActiveRoute('/Clients'), 'decoration': !isActiveRoute('/Clients') }">
        <li class="li" :class="{ 'liRoute': isActiveRoute('/Clients'), 'li': !isActiveRoute('/Clients') }">
          👨‍🦰 Clients
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<style scoped>
.left-panel {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
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