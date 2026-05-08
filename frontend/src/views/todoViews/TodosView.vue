<script setup lang="ts">
import { ref, onMounted } from "vue";
import { api } from "@/services/api";
import { useLoadingStore } from "@/stores/loadingStore";
import TaskCardComponent from "@/components/todosComponents/TaskCardComponent.vue";
import TaskModalComponent from "@/components/todosComponents/TaskModalComponent.vue";
import ConfirmOverlay from "@/components/commonComponents/ConfirmOverlay.vue";
import { useFeedbackStore } from "@/stores/feedbackStore";

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const loadingStore = useLoadingStore();
const feedbackStore = useFeedbackStore();

const todos = ref<Todo[]>([]);
const error = ref<string | null>(null);
const isConfirmOverlayVisible = ref(false);

const todoToDelete = ref<number | null>(null);

let errorTimeout: number | null = null;

const clearError = () => {
  error.value = null;
  if (errorTimeout) {
    clearTimeout(errorTimeout);
    errorTimeout = null;
  }
};

const setError = (message: string) => {
  clearError();
  error.value = message;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  errorTimeout = setTimeout(clearError, 3000);
};

const fetchTodos = async (): Promise<void> => {
  try {
    loadingStore.setLoading(true);
    error.value = null;
    const response = await api.get("/todos");
    todos.value = response;
  } catch (err: any) {
    setError(
      err.response?.data?.message ||
        "Erro ao carregar tarefas. Tente novamente."
    );
  } finally {
    loadingStore.setLoading(false);
  }
};

const editingTask = ref<Partial<Todo> | null>(null);
const isModalOpen = ref(false);
const modalMode = ref<"create" | "edit">("create");

const openCreateModal = () => {
  editingTask.value = null;
  modalMode.value = "create";
  isModalOpen.value = true;
};

const handleEdit = (task: Todo) => {
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "";

  editingTask.value = { ...task, dueDate: formattedDueDate };
  modalMode.value = "edit";
  isModalOpen.value = true;
};

const handleToggleComplete = async (id: number) => {
  try {
    await api.patch(`/todo/${id}/toggle`);
    feedbackStore.showFeedback("Sucesso", "Status da tarefa atualizado!");
    await fetchTodos();
  } catch (err) {
    setError("Erro ao atualizar tarefa. Tente novamente.");
  }
};

const handleSave = async () => {
  const msg = modalMode.value === "create" ? "Tarefa criada com sucesso!" : "Tarefa atualizada com sucesso!";
  feedbackStore.showFeedback("Sucesso", msg);
  isModalOpen.value = false;
  await fetchTodos();
};

const openDeleteConfirmation = (id: number) => {
  todoToDelete.value = id;
  isConfirmOverlayVisible.value = true;
};

const handleDelete = async () => {
  if (!todoToDelete.value) return;

  try {
    await api.delete(`/todo/${todoToDelete.value}`);
    isConfirmOverlayVisible.value = false;
    feedbackStore.showFeedback("Sucesso", "Tarefa Excluída!");

    await fetchTodos();
  } catch (err) {
    isConfirmOverlayVisible.value = false;
    setError("Erro ao excluir tarefa. Tente novamente.");
  }
};

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900">Minhas Tarefas</h1>
        <p class="text-purple-400 text-sm mt-0.5">{{ todos.length }} tarefa{{ todos.length !== 1 ? 's' : '' }} no total</p>
      </div>
      <button class="btn-primary" @click="openCreateModal">+ Nova Tarefa</button>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      {{ error }}
    </div>

    <template v-if="todos.length > 0">
      <TaskCardComponent
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @edit="handleEdit(todo)"
        @delete="openDeleteConfirmation(todo.id)"
        @toggle-complete="handleToggleComplete(todo.id)"
      />
    </template>

    <div
      v-else-if="!error"
      class="bg-white rounded-2xl shadow-purple-sm border border-purple-100/60 p-10 flex flex-col items-center justify-center"
    >
      <div class="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
        <svg class="w-7 h-7 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-gray-500 text-sm mb-4">Nenhuma tarefa ainda. Crie a primeira!</p>
      <button class="btn-primary" @click="openCreateModal">+ Nova Tarefa</button>
    </div>

    <ConfirmOverlay
      v-if="isConfirmOverlayVisible"
      title="Confirmar Mudanças?"
      message="Tem certeza que deseja excluir essa tarefa?"
      @confirm="handleDelete()"
      @cancel="() => { isConfirmOverlayVisible = false; }"
    />

    <TaskModalComponent
      :open="isModalOpen"
      :mode="modalMode"
      :initialData="editingTask"
      @close="isModalOpen = false"
      @save="handleSave"
    />
  </div>
</template>
