<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { uploadImageToCloudinary } from "@/services/uploadImage";
import { useFeedbackStore } from "@/stores/feedbackStore";
import AuthFormContainer from "@/components/auth/AuthFormContainer.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import Divider from "@/components/ui/Divider.vue";
import Button from "@/components/ui/Button.vue";

const router = useRouter();
const feedbackStore = useFeedbackStore();
const errorMessage = ref<string | null>(null);
const isLoading = ref(false);

const handleRegister = async (formData: {
  email: string;
  password: string;
  fullName: string;
  displayName: string;
  birthday: string;
  photoFile?: File | null;
}) => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    let photoUrl: string | undefined;
    if (formData.photoFile) {
      photoUrl = await uploadImageToCloudinary(formData.photoFile);
    }

    await api.post("/register", {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      displayName: formData.displayName,
      birthday: formData.birthday,
      photoUrl,
    });

    feedbackStore.showFeedback("Sucesso", "Cadastro realizado com sucesso!");
    setTimeout(() => router.push("/login"), 1500);
  } catch (error: any) {
    errorMessage.value = error.message || "Erro no cadastro. Tente novamente.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthFormContainer
    title="Criar sua conta"
    subtitle="Comece a organizar suas tarefas agora."
  >
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
