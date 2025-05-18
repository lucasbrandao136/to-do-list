<script setup lang="ts">
import { ref, watch } from "vue";
import FormInput from "@/components/ui/FormInput.vue";
import Button from "@/components/ui/Button.vue";
import { validateUserLogin } from "@/validation/userValidation";

interface Emits {
  (
    e: "submit",
    payload: {
      email: string;
      password: string;
    }
  ): void;
}

const emit = defineEmits<Emits>();

const form = ref({
  email: "",
  password: "",
});

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  loginError: { type: String, default: "" },
});

const errors = ref<string[]>([]);
const handleLogin = () => {
  errors.value = validateUserLogin(form.value.email, form.value.password);

  if (errors.value.length) return;

  emit("submit", form.value);
};

watch(
  () => form.value,
  () => {
    errors.value = [];
  },
  { deep: true }
);
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleLogin" novalidate>
    <FormInput
      v-model="form.email"
      label="Email"
      id="login-email"
      type="email"
      autocomplete="username"
      required
    />

    <FormInput
      v-model="form.password"
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
      :loading="props.loading"
    >
      Entrar
    </Button>

    <div
      v-if="(errors && errors.length > 0) || props.loginError"
      class="rounded-md bg-red-50 p-3"
    >
      <p class="text-sm text-red-600">Credenciais Inválidas.</p>
    </div>
  </form>
</template>
