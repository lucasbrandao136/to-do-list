<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { useAuthStore } from "@/stores/auth";
import AuthFormContainer from "@/components/auth/AuthFormContainer.vue";
import FormInput from "@/components/ui/FormInput.vue";
import Button from "@/components/ui/Button.vue";
import Divider from "@/components/ui/Divider.vue";
import LoginForm from "@/components/auth/LoginForm.vue";

const router = useRouter();

const isLoading = ref(false);

const loginError = ref<string>("");

const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    isLoading.value = true;

    const response = await api.post("/login", {
      email: formData.email,
      password: formData.password,
    });

    const { user, token } = response;

    useAuthStore().login(
      {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        birthday: user.birthday,
        photoUrl: user.photoUrl,
      },
      token
    );

    router.push("/home");
  } catch (error) {
    loginError.value = "invalid";
    console.log(loginError.value);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthFormContainer title="Login">
    <LoginForm
      @submit="handleLogin"
      :loading="isLoading"
      :loginError="loginError"
    />

    <Divider text="Não tem uma conta?" class="my-6" />

    <router-link to="/register">
      <Button variant="secondary" class="w-full"> Cadastre-se </Button>
    </router-link>

    <!-- <div class="mt-6 text-center text-sm text-gray-600">
      Não tem uma conta?
      <router-link
        to="/register"
        class="font-medium text-purple-600 hover:text-purple-700 hover:underline"
      >
        Cadastre-se
      </router-link>
    </div> -->
  </AuthFormContainer>
</template>
