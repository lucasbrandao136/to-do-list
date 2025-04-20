import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import UserRegister from "@/components/UserRegister.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/register", // Rota do Cadastro
    name: "Register",
    component: UserRegister, // Componente de Cadastro
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
