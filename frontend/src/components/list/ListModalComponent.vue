<script setup lang="ts">
import { ref, watch } from "vue";
import { api } from "@/services/api";
import Button from "@/components/ui/Button.vue";
import FormInput from "@/components/ui/FormInput.vue";
import { useFeedbackStore } from "@/stores/feedbackStore";

const feedbackStore = useFeedbackStore();

interface TaskList {
  id?: number;
  name: string;
  color: string;
}

const props = defineProps<{
  open: boolean;
  mode: "create" | "edit";
  initialData?: Partial<TaskList>;
}>();

const emit = defineEmits(["close", "save"]);

const list = ref<TaskList>({
  name: "",
  color: "#3b82f6",
});

const colorOptions = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      list.value = {
        name: newData.name || "",
        color: newData.color || "#3b82f6",
      };
    }
  },
  { immediate: true }
);

const resetForm = () => {
  list.value = {
    name: "",
    color: "#3b82f6",
  };
};

const handleSubmit = async () => {
  try {
    const endpoint =
      props.mode === "create" ? "/list" : `/list/${props.initialData?.id}`;
    const method = props.mode === "create" ? "post" : "put";

    await api[method](endpoint, {
      title: list.value.name,
      name: list.value.name,
      color: list.value.color,
    });
    emit("save", list.value);
    resetForm();
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      (props.mode === "create"
        ? "Não foi possível criar a lista."
        : "Não foi possível salvar a lista.");
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
          <h2 class="text-xl font-bold text-gray-900">
            {{ mode === "create" ? "Nova Lista" : "Editar Lista" }}
          </h2>
          <button
            @click="handleClose"
            class="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
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
            v-model="list.name"
            label="Nome"
            id="list-name"
            type="text"
            required
            placeholder="Nome da lista"
          />

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">Cor</label>
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
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
