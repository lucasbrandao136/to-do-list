<script setup lang="ts">
import { ref, watch } from "vue";
import { api } from "@/services/api";
import Button from "@/components/ui/Button.vue";
import FormInput from "@/components/ui/FormInput.vue";

interface TaskList {
  id?: number;
  title: string;
  color: string;
}

const props = defineProps<{
  open: boolean;
  mode: "create" | "edit";
  initialData?: Partial<TaskList>;
}>();

const emit = defineEmits(["close", "save"]);

const list = ref<TaskList>({
  title: "",
  color: "#3b82f6",
});

const colorOptions = [
  "#3b82f6", // azul
  "#ef4444", // vermelho
  "#10b981", // verde
  "#f59e0b", // amarelo
  "#8b5cf6", // roxo
  "#ec4899", // rosa
];

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      list.value = {
        title: newData.title || "",
        color: newData.color || "#3b82f6",
      };
    }
  },
  { immediate: true }
);

const resetForm = () => {
  list.value = {
    title: "",
    color: "#3b82f6",
  };
};

const handleSubmit = async () => {
  try {
    const endpoint =
      props.mode === "create" ? "/lists" : `/lists/${props.initialData?.id}`;
    const method = props.mode === "create" ? "post" : "put";

    await api[method](endpoint, list.value);
    emit("save", list.value);
    resetForm();
  } catch (error) {
    console.error("Erro ao salvar lista:", error);
  }
};

const handleClose = () => {
  resetForm();
  emit("close");
};
</script>

<template>
  <transition name="modal-fade">
    <div
      v-if="open"
      class="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black bg-opacity-50"
      @click.self="handleClose"
    >
      <div
        class="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all"
      >
        <header
          class="flex items-center justify-between p-6 border-b border-gray-100"
        >
          <h2 class="text-xl font-bold text-gray-900">
            {{ mode === "create" ? "Nova Lista" : "Editar Lista" }}
          </h2>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-500"
            aria-label="Fechar modal"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <FormInput
            v-model="list.title"
            label="Título"
            id="list-title"
            type="text"
            required
            placeholder="Nome da lista"
          />

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Cor</label>
            <div class="flex gap-2">
              <button
                v-for="color in colorOptions"
                :key="color"
                type="button"
                class="w-8 h-8 rounded-full border-2 transition-all hover:ring-2 hover:ring-offset-2 hover:ring-gray-200"
                :class="[
                  list.color === color
                    ? 'border-gray-900'
                    : 'border-transparent',
                ]"
                :style="{ backgroundColor: color }"
                @click="list.color = color"
                :aria-label="`Selecionar cor ${color}`"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" @click="handleClose">
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {{ mode === "create" ? "Criar Lista" : "Salvar" }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
