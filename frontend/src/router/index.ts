import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import SignScreen from "@/views/SignScreen.vue";
import HomeScreen from "@/views/HomeScreen.vue";
import { useAuthStore } from "@/stores/auth";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "register",
    component: SignScreen,
  },
  {
    path: "/login",
    name: "login",
    component: SignScreen,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: SignScreen,
  },
  {
    path: "/",
    name: "Home",
    component: HomeScreen,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeScreen,
  },
  {
    path: "/todos",
    name: "todos",
    component: HomeScreen,
  },
  {
    path: "/new/todo",
    name: "new-todo",
    component: HomeScreen,
  },
  {
    path: "/lists",
    name: "lists",
    component: HomeScreen,
  },
  {
    path: "/profile",
    name: "profile",
    component: HomeScreen,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const publicPages = ["/login", "/register", "/forgot-password"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !auth.user) {
    return next({ name: "login" });
  }

  if (!authRequired && auth.user) {
    return next({ name: "Home" });
  }

  next();
});

export default router;
