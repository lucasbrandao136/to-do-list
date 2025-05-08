<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const emit = defineEmits(['toggleSidebar']);

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
    <div class="flex items-center gap-4">
      <!-- Botão Mobile -->
      <button 
        @click="emit('toggleSidebar')"
        class="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        aria-label="Alternar menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Logo/App Name -->
      <router-link to="/home" class="flex items-center gap-2">
        <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          TaskFlow
        </span>
      </router-link>
    </div>

    <!-- User Profile -->
    <div class="flex items-center gap-4">
      <router-link 
        to="/profile" 
        class="flex items-center gap-2 group"
        aria-label="Perfil do usuário"
      >
        <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
          {{ user?.displayName?.charAt(0) || '👤' }}
        </div>
        <span class="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
          {{ user?.displayName || 'Perfil' }}
        </span>
      </router-link>
    </div>
  </header>
</template>