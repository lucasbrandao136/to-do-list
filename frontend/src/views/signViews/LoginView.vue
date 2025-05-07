<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { useAuthStore } from "@/stores/auth";
import AuthFormContainer from "@/components/auth/AuthFormContainer.vue";
import FormInput from "@/components/ui/FormInput.vue";
import Button from "@/components/ui/Button.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    const { user, token } = response;

    useAuthStore().login({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      birthday: user.birthday,
      photoUrl: user.photoUrl,
    }, token);

    router.push("/home");
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || "Erro ao tentar fazer login. Tente novamente.";
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthFormContainer title="Login">
    <form class="space-y-4" @submit.prevent="handleLogin">
      <FormInput
        v-model="email"
        label="Email"
        id="login-email"
        type="email"
        autocomplete="username"
        required
      />

      <FormInput
        v-model="password"
        label="Senha"
        id="login-password"
        type="password"
        autocomplete="current-password"
        required
      />

      <div class="flex items-center justify-between">
        <router-link 
          to="/forgot-password" 
          class="text-sm text-purple-600 hover:text-purple-700 hover:underline"
        >
          Esqueceu a senha?
        </router-link>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        class="w-full"
        :loading="isLoading"
      >
        Entrar
      </Button>

      <div v-if="errorMessage" class="rounded-md bg-red-50 p-3">
        <p class="text-sm text-red-600">{{ errorMessage }}</p>
      </div>
    </form>

    <div class="mt-6 text-center text-sm text-gray-600">
      Não tem uma conta?
      <router-link 
        to="/register" 
        class="font-medium text-purple-600 hover:text-purple-700 hover:underline"
      >
        Cadastre-se
      </router-link>
    </div>
  </AuthFormContainer>
</template>