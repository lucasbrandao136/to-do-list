<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const router = useRouter();

function navigateTo(path: string): void {
  router.push(path);
}

const logout = () => {
  const auth = useAuthStore();
  auth.logout();
  navigateTo("/login");
};
</script>
<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r p-6 flex flex-col">
      <h1 class="text-2xl font-bold mb-6">Menu</h1>

      <nav class="flex-1">
        <ul class="space-y-4">
          <li>
            <router-link
              to="/home"
              class="flex items-center text-gray-700 hover:text-indigo-600"
            >
              📅 <span class="ml-2">Today</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/calendar"
              class="flex items-center text-gray-700 hover:text-indigo-600"
            >
              🗓️ <span class="ml-2">Calendar</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <button
        @click="logout"
        class="mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Sair
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold">Today</h2>
        <span class="bg-gray-200 px-3 py-1 rounded-full text-sm">5</span>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-gray-700">Aqui ficam suas tarefas do dia.</p>
      </div>
    </main>
  </div>
</template>
