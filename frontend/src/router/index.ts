import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import LoginView from "@/views/signViews/LoginView.vue";
import RegisterView from "@/views/signViews/RegisterView.vue";
import ForgotPasswordView from "@/views/signViews/ForgotPasswordView.vue";
import HomeView from "@/views/todoViews/HomeView.vue";
import TodosView from "@/views/todoViews/TodosView.vue";
import ListView from "@/views/todoViews/ListView.vue";
import ProfileView from "@/views/todoViews/ProfileView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/forgot-password", name: "forgot-password", component: ForgotPasswordView },
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: HomeView },
  { path: "/todos", name: "todos", component: TodosView },
  { path: "/lists", name: "lists", component: ListView },
  { path: "/profile", name: "profile", component: ProfileView },
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
    return next({ name: "home" });
  }

  next();
});

export default router;
