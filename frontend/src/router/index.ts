import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import SignScreen from "@/SignScreen.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "Register",
    component: SignScreen,
  },
  {
    path: "/login",
    name: "login",
    component: SignScreen,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
