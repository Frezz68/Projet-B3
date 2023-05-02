<script setup>
</script>

<template>
  <div class="Page">
    <div class="Titre">
      <span>Données de la semaine :</span>
    </div>
    <div class="row">
      <div class="taille">
        <div class="Section">
          <span class="Intitule">Nombre de commande :</span>
          <span class="Valeur">204</span>
        </div>
      </div>
      <div class="taille">
        <div class="Section">
          <span class="Intitule">Chiffre d'affaire de la semain :</span>
          <span class="Valeur">203 405,99€</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="taille">
        <div class="Section">
          <span class="Intitule">Commande impayé :</span>
          <span class="Valeur">4</span>
        </div>
      </div>
      <div class="taille">
        <div class="Section">
          <span class="Intitule">Nouvelle commande :</span>
          <span class="Valeur">13</span>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>
.Page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.Titre {
  display: flex;
  margin-top: 5vh;
  margin-left: 5vh;
}

.Titre span {
  color: #3f72b7;
  font-size: 1.5rem;
  text-decoration: underline;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 5vh;
  justify-content: space-evenly;
}

.taille {
  display: flex;
  width: 30vw;
  height: 20vh;
  background-color: #ffffff;
  border-radius: 10px;
  border : 3px solid #3f72b7;

}

.Section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.Intitule {
  margin: 10px;
  height: auto;
  display: flex;
  justify-content: start;
}

.Valeur {
  height: auto;
  display: flex;
  justify-content: end;
  position: absolute;
  bottom: 4px;
  right: 4px;
}

span {
  color: #3f72b7;
  font-size: 1.2rem;
}

</style>