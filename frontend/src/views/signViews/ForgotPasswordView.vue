<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Recuperar senha</h2>
      <form @submit.prevent="handleRecoverPassword">
        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="email"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Enviar link de recuperação
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");

const handleRecoverPassword = () => {
  alert("Instruções enviadas para o email!");
};
</script>
