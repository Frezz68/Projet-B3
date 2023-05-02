<script setup>
const produits = [
  {
    photo: null,
    name: "Produit 1",
    prix: 10,
    stock: 10
  },
  {
    photo: null,
    name: "Produit 2",
    prix: 20,
    stock: 20
  },
  {
    photo: null,
    name: "Produit 3",
    prix: 30,
    stock: 30
  },
  {
    photo: null,
    name: "Produit 4",
    prix: 40,
    stock: 40
  },
  {
    photo: null,
    name: "Produit 5",
    prix: 50,
    stock: 50
  },
  {
    photo: null,
    name: "Produit 2",
    prix: 20,
    stock: 20
  },
  {
    photo: null,
    name: "Produit 3",
    prix: 30,
    stock: 30
  },
  {
    photo: null,
    name: "Produit 4",
    prix: 40,
    stock: 40
  },
  {
    photo: null,
    name: "Produit 5",
    prix: 50,
    stock: 50
  },
  {
    photo: null,
    name: "Produit 2",
    prix: 20,
    stock: 20
  },
  {
    photo: null,
    name: "Produit 3",
    prix: 30,
    stock: 30
  },
  {
    photo: null,
    name: "Produit 4",
    prix: 40,
    stock: 40
  },
  {
    photo: null,
    name: "Produit 5",
    prix: 50,
    stock: 50
  },
  {
    photo: null,
    name: "Produit 2",
    prix: 20,
    stock: 20
  },
  {
    photo: null,
    name: "Produit 3",
    prix: 30,
    stock: 30
  },
  {
    photo: null,
    name: "Produit 4",
    prix: 40,
    stock: 40
  },
  {
    photo: null,
    name: "Produit 5",
    prix: 50,
    stock: 50
  },
  {
    photo: null,
    name: "Produit 2",
    prix: 20,
    stock: 20
  },
  {
    photo: null,
    name: "Produit 3",
    prix: 30,
    stock: 30
  },
  {
    photo: null,
    name: "Produit 4",
    prix: 40,
    stock: 40
  },
  {
    photo: null,
    name: "Produit 5",
    prix: 50,
    stock: 50
  },
  {
    photo: null,
    name: "Produit 2",
    prix: 20,
    stock: 20
  },
  {
    photo: null,
    name: "Produit 3",
    prix: 30,
    stock: 30
  },
  {
    photo: null,
    name: "Produit 4",
    prix: 40,
    stock: 40
  },
  {
    photo: null,
    name: "Produit 5",
    prix: 50,
    stock: 50
  },
  {
    photo: null,
    name: "Produit 2",
    prix: 20,
    stock: 20
  },
  {
    photo: null,
    name: "Produit 3",
    prix: 30,
    stock: 30
  },
  {
    photo: null,
    name: "Produit 4",
    prix: 40,
    stock: 40
  },
  {
    photo: null,
    name: "Produit 5",
    prix: 50,
    stock: 50
  }
]
</script>

<template>
  <div class="Page">
    <div class="Titre">
      <span>Gestions des produits</span>
    </div>

    <div class="Tableau">
      <table>
        <thead>
        <tr>
          <th>Photo</th>
          <th>Nom</th>
          <th>Prix</th>
          <th>Stock</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="produit in produits" :key="id">
          <td>{{ produit.photo }}</td>
          <td>{{ produit.name }}</td>
          <td>{{ produit.prix }}</td>
          <td>{{ produit.stock }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.Page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.Titre {
  display: flex;
  margin-top: 5vh;
  margin-left: 5vh;
}

.Titre span {
  color: #3f72b7;
  font-size: 1.5rem;
}

table {
  border-collapse: collapse;
  width: 94%;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  margin: 3%;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #739cd3;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #c4d0e0;
}

tr:hover {
  background-color: #a6c5f6;
}

td:nth-child(4),
td:nth-child(3) {
  text-align: right;
}

td:nth-child(3):after {
  content: " €";
}


</style>
