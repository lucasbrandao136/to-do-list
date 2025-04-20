<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

function navigateTo(path: string): void {
  router.push(path);
}

const handleLogin = async () => {
  try {
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    const user = response.user;
    const token = response.token;

    const auth = useAuthStore();
    const userToStore = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      birthday: user.birthday,
      photoUrl: user.photoUrl,
    };

    auth.login(userToStore, token);

    navigateTo("/home");
  } catch (error: any) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
    } else {
      console.log("Erro ao tentar fazer login. Tente novamente.");
    }
  } finally {
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
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
        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="password"
            >Senha</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="flex justify-between items-center mb-6">
          <router-link
            to="/forgot-password"
            class="text-sm text-indigo-600 hover:underline"
            >Esqueceu a senha?</router-link
          >
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>
