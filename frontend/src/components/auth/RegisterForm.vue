<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from "vue";
import FormInput from "../ui/FormInput.vue";
import PasswordStrengthMeter from "./PasswordStrengthMeter.vue";
import Button from "../ui/Button.vue";
import { validateNewUser } from "@/validation/userValidation";

const errorMessages = ref<Record<string, string>>({});

const mensagensMap: Record<string, string> = {
  email: "Email é obrigatório.",
  invalidEmail: "Email inválido.",
  password: "Senha deve ter ao menos 8 caracteres.",
  fullName: "Nome completo é obrigatório.",
  displayName: "Nome de usuário é obrigatório.",
  birthday: "Data de nascimento é obrigatória.",
};

interface Emits {
  (
    e: "submit",
    payload: {
      email: string;
      password: string;
      fullName: string;
      displayName: string;
      birthday: string;
      photoFile: File | null;
    }
  ): void;
}

const emit = defineEmits<Emits>();

const form = ref({
  email: "",
  password: "",
  fullName: "",
  displayName: "",
  birthday: "",
  photoFile: null as File | null,
});

const passwordStrength = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);
const filePreview = ref<string>("");

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files?.[0];

  if (filePreview.value) {
    URL.revokeObjectURL(filePreview.value);
  }

  if (selectedFile) {
    filePreview.value = URL.createObjectURL(selectedFile);
    form.value.photoFile = selectedFile;
  } else {
    filePreview.value = "";
    form.value.photoFile = null;
  }
};

const checkPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  return Math.min(strength, 4);
};

const handlePasswordInput = (value: string) => {
  form.value.password = value;
  passwordStrength.value = checkPasswordStrength(value);
};

const handleSubmit = () => {
  const { errors } = validateNewUser(form.value);

  if (errors.length) {
    errorMessages.value = {};
    errors.forEach((chave) => {
      errorMessages.value[chave] = mensagensMap[chave];
    });
    return;
  }

  errorMessages.value = {};
  emit("submit", form.value);
};

watch(
  () => form.value.fullName,
  () => (errorMessages.value.fullName = "")
);

watch(
  () => form.value.displayName,
  () => (errorMessages.value.displayName = "")
);

watch(
  () => form.value.email,
  () => {
    errorMessages.value.email = "";
    errorMessages.value.invalidEmail = "";
  }
);

watch(
  () => form.value.password,
  () => (errorMessages.value.password = "")
);

watch(
  () => form.value.birthday,
  () => (errorMessages.value.birthday = "")
);

onBeforeUnmount(() => {
  if (filePreview.value) {
    URL.revokeObjectURL(filePreview.value);
  }
});
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit" novalidate>
    <div>
      <FormInput
        v-model="form.fullName"
        label="Nome completo"
        id="fullName"
        type="text"
      />
      <p v-if="errorMessages.fullName" class="text-red-600 text-xs ml-1">
        {{ errorMessages.fullName }}
      </p>
    </div>

    <div>
      <FormInput
        v-model="form.displayName"
        label="Nome de usuário"
        id="displayName"
        type="text"
      />
      <p v-if="errorMessages.displayName" class="text-red-600 text-xs ml-1">
        {{ errorMessages.displayName }}
      </p>
    </div>

    <div>
      <FormInput
        v-model="form.email"
        label="Email"
        id="email"
        type="email"
        autocomplete="email"
      />
      <p
        v-if="errorMessages.email && !errorMessages.invalidEmail"
        class="text-red-600 text-xs ml-1"
      >
        {{ errorMessages.email }}
      </p>
      <p v-if="errorMessages.invalidEmail" class="text-red-600 text-xs ml-1">
        {{ errorMessages.invalidEmail }}
      </p>
    </div>

    <div>
      <FormInput
        v-model="form.birthday"
        label="Data de nascimento"
        id="birthday"
        type="date"
      />
      <p v-if="errorMessages.birthday" class="text-red-600 text-xs ml-1">
        {{ errorMessages.birthday }}
      </p>
    </div>

    <div>
      <FormInput
        v-model="form.password"
        @update:modelValue="handlePasswordInput"
        label="Senha"
        id="password"
        type="password"
      >
        <template #after>
          <PasswordStrengthMeter :strength="passwordStrength" />
        </template>
      </FormInput>
      <p v-if="errorMessages.password" class="text-red-600 text-xs ml-1">
        {{ errorMessages.password }}
      </p>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Foto de perfil
      </label>

      <div class="flex items-start gap-4">
        <div v-if="filePreview" class="relative group">
          <img
            :src="filePreview"
            alt="Preview"
            class="h-28 w-28 rounded-lg object-cover border-2 border-purple-100 shadow-sm transition-all duration-200 group-hover:border-purple-300"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all duration-200"
          >
            <!-- <span
              class="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black bg-opacity-60 px-2 py-1 rounded transition-opacity duration-200"
            >
              Alterar
            </span> -->
          </div>
        </div>

        <div class="flex-1">
          <input
            ref="fileInput"
            id="profileImage"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="hidden"
          />

          <div class="flex flex-col gap-2">
            <button
              type="button"
              @click="fileInput?.click()"
              class="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Selecionar imagem
            </button>

            <div
              v-if="fileInput?.files?.length"
              class="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200"
            >
              <p class="font-medium text-gray-700">
                {{ fileInput.files[0].name }}
              </p>
              <p class="text-gray-500">
                {{ (fileInput.files[0].size / 1024).toFixed(1) }} KB
              </p>
            </div>
            <div v-else class="text-xs text-gray-500 italic">
              Nenhum arquivo selecionado
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs text-gray-500 mt-1">
        Formatos suportados: JPG, PNG (Máx. 5MB)
      </p>
    </div>

    <Button
      type="submit"
      variant="primary"
      :loading="props.loading"
      class="w-full"
    >
      Criar conta
    </Button>
  </form>
</template>
