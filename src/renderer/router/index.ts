import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import AnimalForm from '../views/AnimalForm.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/animals/add', component: AnimalForm },
  { path: '/animals/edit/:id', component: AnimalForm },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
