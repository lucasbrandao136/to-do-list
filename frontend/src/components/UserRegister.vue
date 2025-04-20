<script setup lang="ts">
import { ref } from "vue";
import { api } from "../services/api";

const email = ref<string>("");
const password = ref<string>("");
const fullName = ref<string>("");
const displayName = ref<string>("");
const birthday = ref<string>("");
const photoUrl = ref<string>("");

const handleSubmit = async () => {
  try {
    const response = await api.post("/register", {
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      displayName: displayName.value,
      birthday: birthday.value,
      photoUrl: photoUrl.value,
    });

    console.log("Usuário cadastrado:", response);
    alert("Cadastro realizado com sucesso!");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro no cadastro. Tente novamente.";
    console.error("Erro ao cadastrar:", error);
    alert(errorMessage);
  }
};
</script>
<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-center mb-6">Cadastro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email:</label
        >
        <input
          type="email"
          v-model="email"
          id="email"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Senha:</label
        >
        <input
          type="password"
          v-model="password"
          id="password"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="fullName" class="block text-sm font-medium text-gray-700"
          >Nome Completo:</label
        >
        <input
          type="text"
          v-model="fullName"
          id="fullName"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="displayName" class="block text-sm font-medium text-gray-700"
          >Nome de Exibição:</label
        >
        <input
          type="text"
          v-model="displayName"
          id="displayName"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="birthday" class="block text-sm font-medium text-gray-700"
          >Data de Nascimento:</label
        >
        <input
          type="date"
          v-model="birthday"
          id="birthday"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="photoUrl" class="block text-sm font-medium text-gray-700"
          >URL da Foto:</label
        >
        <input
          type="text"
          v-model="photoUrl"
          id="photoUrl"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Cadastrar
      </button>
    </form>
  </div>
</template>
