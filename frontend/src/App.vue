<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { useLoadingStore } from "@/stores/loadingStore";
import HeaderComponent from "./components/commonComponents/HeaderComponent.vue";
import SidebarComponent from "./components/commonComponents/SidebarComponent.vue";
import FooterComponent from "./components/commonComponents/FooterComponent.vue";
import LoadComponent from "./components/commonComponents/LoadComponent.vue";
import FeedbackComponent from "./components/commonComponents/FeedbackComponent.vue";

const loadingStore = useLoadingStore();
const route = useRoute();
const sidebarOpen = ref(false);

const auth = useAuthStore();
auth.loadUserFromLocalStorage();

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const isAuthPage = computed(() =>
  ["login", "register", "forgot-password"].includes(route.name as string)
);
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <HeaderComponent v-if="!isAuthPage" @toggleSidebar="toggleSidebar" />

    <FeedbackComponent class="fixed top-5 right-5 z-50" />

    <div class="flex flex-1 overflow-hidden">
      <SidebarComponent
        v-if="!isAuthPage"
        :open="sidebarOpen"
        @closeSidebar="toggleSidebar"
      />

      <!-- Mobile overlay -->
      <div
        v-if="sidebarOpen && !isAuthPage"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        @click="toggleSidebar"
      />

      <LoadComponent v-if="loadingStore.loading" />

      <main class="flex-1 px-4 pt-3 pb-4 md:px-6 md:pt-4 md:pb-6 bg-purple-50 overflow-y-auto">
        <router-view />
      </main>
    </div>

    <FooterComponent v-if="!isAuthPage" />
  </div>
</template>
