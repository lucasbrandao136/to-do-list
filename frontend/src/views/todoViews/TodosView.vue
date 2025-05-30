<script setup lang="ts">
import { ref, onMounted } from "vue";
import { api } from "@/services/api";
import { useLoadingStore } from "@/stores/loadingStore";
import TaskCardComponent from "@/components/todosComponents/TaskCardComponent.vue";
import TaskModalComponent from "@/components/todosComponents/TaskModalComponent.vue";
import ConfirmOverlay from "@/components/commonComponents/ConfirmOverlay.vue";
import { useFeedbackStore } from "@/stores/feedbackStore";
// import EmptyState from '@/components/ui/EmptyState.vue';

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
    todos.value = response.data || response;
  } catch (err: any) {
    console.error("Failed to fetch todos:", err);
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

const handleEdit = (task: Todo) => {
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "";

  const payload = {
    ...task,
    dueDate: formattedDueDate,
  };

  editingTask.value = payload;
  modalMode.value = "edit";
  isModalOpen.value = true;
};

const handleSave = async (savedTask: Todo) => {
  try {
    await api.put(`/todo/${savedTask.id}`, savedTask);
    feedbackStore.showFeedback("Sucesso", "Tarefa atualizada com sucesso!");
    isModalOpen.value = false;
    await fetchTodos();
  } catch (error) {
    setError("Erro ao salvar tarefa. Tente novamente.");
  }
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
      />
    </template>

    <ConfirmOverlay
      v-if="isConfirmOverlayVisible"
      title="Confirmar Mudanças?"
      message="Tem certeza que deseja excluir essa tarefa?"
      @confirm="handleDelete()"
      @cancel="
        () => {
          isConfirmOverlayVisible = false;
        }
      "
    />

    <TaskModalComponent
      :open="isModalOpen"
      :mode="modalMode"
      :initialData="editingTask"
      @close="isModalOpen = false"
      @save="handleSave"
    />

    <!-- <EmptyState 
      v-else
      title="Nenhuma tarefa encontrada"
      description="Comece criando sua primeira tarefa"
      icon="📝"
    /> -->
  </div>
</template>
