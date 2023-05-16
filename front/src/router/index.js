import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProduitsView from '../views/ProduitsView.vue'
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import FacturesView from "@/views/FacturesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
        beforeEnter: (to, from) => {
          if(localStorage.getItem('token') == null){
            router.push("/");
          }
          else{
            return true;
          }
        }
    },
    {
      path: '/produits',
      name: 'produits',
      component: ProduitsView,
      beforeEnter: (to, from) => {
        if(localStorage.getItem('token') == null){
          router.push("/");
        }
        else{
          return true;
        }
      },
    },
    {
      path: '/factures',
      name: 'factures',
      component: FacturesView,
      beforeEnter: (to, from) => {
        if(localStorage.getItem('token') == null){
          router.push("/");
        }
        else{
          return true;
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView
    }
  ]
})

export default router
