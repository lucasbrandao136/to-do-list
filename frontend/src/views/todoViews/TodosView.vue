<script setup lang="ts">
import { api } from "@/services/api";
import { ref, computed, onMounted } from "vue";
import { useLoadingStore } from "@/stores/loadingStore";
const loadingStore = useLoadingStore();
interface ITodo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const _todos = ref<ITodo[]>([]);
const todos = computed(() => {
  return _todos.value;
});
const getTodos = async () => {
  try {
    const response = await api.get("/todos");
    _todos.value = response;
  } catch (error: any) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
    } else {
      console.log("Erro ao tentar buscar tarefas. Tente novamente.");
    }
  }
};
import TaskCardComponent from "@/components/todosComponents/TaskCardComponent.vue";

const initializePage = async (): Promise<void> => {
  loadingStore.setLoading(true);
  await getTodos();
  loadingStore.setLoading(false);

};
onMounted(async () => {
  initializePage();
});
</script>
<template>
  <div
    v-for="todo in todos"
    key="todo.id"
    class="mb-4"
  >
    <TaskCardComponent
      :key="todo.id"
      :title="todo.title"
      :description="todo.description"
      :dueDate="todo.dueDate"
    />
  </div>
</template>
