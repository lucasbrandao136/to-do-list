<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["toggleSidebar"]);

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
  <header
    class="header-glass px-6 py-3 flex justify-between items-center sticky top-0 z-30"
  >
    <div class="flex items-center gap-4">
      <!-- Mobile menu button -->
      <button
        @click="emit('toggleSidebar')"
        class="md:hidden p-2 rounded-xl hover:bg-purple-100 text-purple-700 transition-colors"
        aria-label="Alternar menu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Logo -->
      <router-link to="/home" class="flex items-center gap-2">
        <span
          class="text-xl font-bold bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent"
        >
          TaskFlow
        </span>
      </router-link>
    </div>

    <!-- User profile -->
    <div class="flex items-center gap-3">
      <router-link
        to="/profile"
        class="flex items-center gap-2.5 group"
        aria-label="Perfil do usuário"
      >
        <div
          class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-purple-sm group-hover:shadow-purple-md transition-all duration-200"
        >
          {{ user?.displayName?.charAt(0)?.toUpperCase() || "?" }}
        </div>
        <span
          class="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors"
        >
          {{ user?.displayName || "Perfil" }}
        </span>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.header-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 1px 0 0 rgba(139, 92, 246, 0.15);
}
</style>
