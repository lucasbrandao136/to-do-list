<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { useLoadingStore } from "@/stores/loadingStore";

import HeaderComponent from "./components/commonComponents/HeaderComponent.vue";
import SidebarComponent from "./components/commonComponents/SidebarComponent.vue";
import FooterComponent from "./components/commonComponents/FooterComponent.vue";
import LoadComponent from "./components/commonComponents/LoadComponent.vue";
import FeedbackComponent from "./components/commonComponents/FeedbackComponent.vue";

const loadingStore = useLoadingStore();
const route = useRoute();
const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const isAuthPage = computed(() => {
  return ["login", "register", "forgot-password"].includes(
    route.name as string
  );
});

import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();
auth.loadUserFromLocalStorage();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent v-if="!isAuthPage" @toggleSidebar="toggleSidebar" />

    <!-- FeedbackComponent -->
    <FeedbackComponent class="fixed top-5 right-5 z-50" />

    <div class="flex flex-1">
      <SidebarComponent
        v-if="!isAuthPage"
        :open="sidebarOpen"
        @closeSidebar="toggleSidebar"
      />

      <LoadComponent v-if="loadingStore.loading" />
      <main class="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <router-view />
      </main>
    </div>

    <FooterComponent v-if="!isAuthPage" />
  </div>
</template>
