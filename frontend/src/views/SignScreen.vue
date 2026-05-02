<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useRoute } from "vue-router";

import LoginView from "./signViews/LoginView.vue";
import ForgotPasswordView from "./signViews/ForgotPasswordView.vue";
import RegisterView from "./signViews/RegisterView.vue";

const route = useRoute();
const currentPath = ref(window.location.pathname);

const routes: any = {
  0: RegisterView,
  1: LoginView,
  2: ForgotPasswordView,
};

watch(
  () => route.params,
  async (): Promise<void> => {
    currentPath.value = window.location.pathname + window.location.hash;
  }
);

const currentView = computed(() => {
  const _path = currentPath.value.split("/")[1];
  switch (_path) {
    case "register":
      return routes[0];
    case "login":
      return routes[1];
    case "forgot-password":
      return routes[2];
    default:
      return routes[0];
  }
});
</script>

<template>
  <component :is="currentView" />
</template>
