<script setup lang="ts">
import { ref } from "vue";
import { api } from "@/services/api";
import { uploadImageToCloudinary } from "@/services/uploadImage";
import AuthFormContainer from "@/components/auth/AuthFormContainer.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import Divider from "@/components/ui/Divider.vue";
import Button from "@/components/ui/Button.vue";

const errorMessage = ref<string | null>(null);
const isLoading = ref(false);

const handleRegister = async (formData: {
  email: string;
  password: string;
  fullName: string;
  displayName: string;
  birthday: string;
  photoUrl: string;
}) => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    await api.post("/register", formData);
    alert("Cadastro realizado com sucesso!");
    // Redirecionar para login ou página inicial
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || "Erro no cadastro. Tente novamente.";
    console.error("Erro ao cadastrar:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthFormContainer title="Criar conta">
    <RegisterForm @submit="handleRegister" :loading="isLoading" />

    <Divider text="Já tem uma conta?" class="my-6" />

    <router-link to="/login">
      <Button variant="secondary" class="w-full"> Fazer login </Button>
    </router-link>

    <div v-if="errorMessage" class="mt-4 rounded-md bg-red-50 p-4">
      <p class="text-sm text-red-600">{{ errorMessage }}</p>
    </div>
  </AuthFormContainer>
</template>
