<script setup lang="ts">
import { ref } from "vue";
import AuthFormContainer from "@/components/auth/AuthFormContainer.vue";
import FormInput from "@/components/ui/FormInput.vue";
import Button from "@/components/ui/Button.vue";

const email = ref("");
const submitted = ref(false);
const isLoading = ref(false);

const handleSubmit = () => {
  if (!email.value.trim()) return;
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    submitted.value = true;
  }, 1000);
};
</script>

<template>
  <AuthFormContainer title="Recuperar senha">
    <template v-if="!submitted">
      <p class="text-gray-600 text-sm text-center mb-4">
        Informe seu email e enviaremos um link para redefinir sua senha.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <FormInput
          v-model="email"
          label="Email"
          id="forgot-email"
          type="email"
          placeholder="seu@email.com"
        />

        <Button
          type="submit"
          variant="primary"
          :loading="isLoading"
          class="w-full"
        >
          Enviar link de recuperacao
        </Button>
      </form>
    </template>

    <template v-else>
      <div class="text-center space-y-4">
        <div
          class="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p class="text-gray-700 font-medium">Email enviado!</p>
        <p class="text-gray-500 text-sm">
          Se este email estiver cadastrado, voce recebera um link para redefinir
          sua senha.
        </p>
      </div>
    </template>

    <div class="mt-6 text-center">
      <router-link
        to="/login"
        class="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline"
      >
        Voltar para o login
      </router-link>
    </div>
  </AuthFormContainer>
</template>
