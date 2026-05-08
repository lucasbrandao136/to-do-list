<script setup lang="ts">
import { ref, watch } from "vue";
import { api } from "@/services/api";
import Button from "@/components/ui/Button.vue";
import FormInput from "../ui/FormInput.vue";
import { useFeedbackStore } from "@/stores/feedbackStore";

const feedbackStore = useFeedbackStore();

interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
}

const props = defineProps<{
  open: boolean;
  mode: "create" | "edit";
  initialData?: Partial<Task> | null;
}>();

const emit = defineEmits(["close", "save"]);

const task = ref<Task>({
  title: "",
  description: "",
  dueDate: "",
});

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      task.value = { ...task.value, ...newData };
    }
  },
  { immediate: true }
);

const resetForm = () => {
  task.value = { title: "", description: "", dueDate: "" };
};

const handleSubmit = async () => {
  try {
    if (props.mode === "edit" && task.value.id) {
      await api.put(`/todo/${task.value.id}`, task.value);
    } else {
      await api.post("/new/todo", task.value);
    }
    emit("save", task.value);
    resetForm();
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      (props.mode === "edit"
        ? "Não foi possível salvar a tarefa."
        : "Não foi possível criar a tarefa.");
    feedbackStore.showFeedback("Erro", message);
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
      class="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/60 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div
        class="bg-white rounded-2xl shadow-purple-lg w-full max-w-md border border-purple-100/60 transform transition-all"
      >
        <header
          class="flex items-center justify-between px-6 py-5 border-b border-purple-100/60"
        >
          <div>
            <h2 class="text-lg font-bold text-gray-900">
              {{ mode === "create" ? "Nova Tarefa" : "Editar Tarefa" }}
            </h2>
            <p class="text-purple-400 text-xs mt-0.5">
              {{
                mode === "create"
                  ? "Preencha os dados abaixo"
                  : "Atualize os dados da tarefa"
              }}
            </p>
          </div>
          <button
            @click="handleClose"
            class="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
            aria-label="Fechar modal"
          >
            <svg
              class="h-5 w-5"
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
            v-model="task.title"
            label="Título"
            id="task-title"
            type="text"
            required
            placeholder="Digite o título da tarefa"
          />

          <FormInput
            v-model="task.description"
            label="Descrição"
            id="task-description"
            type="textarea"
            required
            placeholder="Adicione detalhes sobre a tarefa"
          />

          <FormInput
            v-model="task.dueDate"
            label="Prazo"
            id="task-due-date"
            type="date"
            required
          />

          <div class="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" @click="handleClose">
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {{ mode === "create" ? "Criar Tarefa" : "Salvar" }}
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
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
