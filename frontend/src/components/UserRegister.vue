<script setup lang="ts">
import { ref } from "vue";
import { api } from "../services/api";

const email = ref<string>("");
const password = ref<string>("");
const fullName = ref<string>("");
const displayName = ref<string>("");
const birthday = ref<string>("");
const photoUrl = ref<string>("");
const passwordStrength = ref<number>(0);

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

const checkPasswordStrength = () => {
  const pass = password.value;
  let strength = 0;

  // Critério 1: Tamanho mínimo (8 caracteres)
  if (pass.length >= 8) strength++;

  // Critério 2: Contém letras maiúsculas e minúsculas
  if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;

  // Critério 3: Contém números
  if (/\d/.test(pass)) strength++;

  // Critério 4: Contém caracteres especiais
  if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;

  passwordStrength.value = Math.min(strength, 4);
};
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Criar conta
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Full Name -->
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <div class="mt-1">
            <input
              id="fullName"
              v-model="fullName"
              name="fullName"
              type="text"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Display Name -->
        <div>
          <label
            for="displayName"
            class="block text-sm font-medium text-gray-700"
          >
            Nome de usuário(Como quero ser chamado)
          </label>
          <div class="mt-1">
            <input
              id="displayName"
              v-model="displayName"
              name="displayName"
              type="text"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Birthday -->
        <div>
          <label for="birthday" class="block text-sm font-medium text-gray-700">
            Data de nascimento
          </label>
          <div class="mt-1">
            <input
              id="birthday"
              v-model="birthday"
              name="birthday"
              type="date"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Create password
          </label>
          <div class="mt-1">
            <input
              id="password"
              v-model="password"
              @input="checkPasswordStrength"
              name="password"
              type="password"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div class="mt-2">
            <div class="flex mt-1 space-x-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1 flex-1 rounded transition-colors duration-300"
                :class="{
                  'bg-red-500': passwordStrength === 1 && i === 1,
                  'bg-yellow-500': passwordStrength === 2 && i <= 2,
                  'bg-blue-500': passwordStrength === 3 && i <= 3,
                  'bg-green-500': passwordStrength === 4 && i <= 4,
                  'bg-gray-200': i > passwordStrength,
                }"
              ></div>
            </div>
            <p class="text-xs mt-1 text-gray-500">
              <span v-if="passwordStrength === 0">Muito fraca</span>
              <span v-else-if="passwordStrength === 1" class="text-red-500"
                >Fraca</span
              >
              <span v-else-if="passwordStrength === 2" class="text-yellow-500"
                >Média</span
              >
              <span v-else-if="passwordStrength === 3" class="text-blue-500"
                >Boa</span
              >
              <span v-else class="text-green-500">Forte</span>
            </p>
          </div>
        </div>

        <!-- Photo URL -->
        <div>
          <label for="photoUrl" class="block text-sm font-medium text-gray-700">
            Foto
          </label>
          <div class="mt-1">
            <input
              id="photoUrl"
              v-model="photoUrl"
              name="photoUrl"
              type="text"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="passwordStrength < 2"
            :class="passwordStrength < 2 ? 'opacity-50 cursor-not-allowed' : ''"
          >
            Criar conta
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              Já tem uma conta?
          </span>
          </div>
        </div>

        <div class="mt-6">
          <router-link to="/login">
            <button
              type="button"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
