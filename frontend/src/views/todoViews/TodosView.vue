<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { useLoadingStore } from '@/stores/loadingStore';
import TaskCardComponent from '@/components/todosComponents/TaskCardComponent.vue';
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
const todos = ref<Todo[]>([]);
const error = ref<string | null>(null);

const fetchTodos = async (): Promise<void> => {
  try {
    loadingStore.setLoading(true);
    error.value = null;
    const response = await api.get('/todos');
    todos.value = response.data || response; 
  } catch (err: any) {
    console.error('Failed to fetch todos:', err);
    error.value = err.response?.data?.message || 'Erro ao carregar tarefas. Tente novamente.';
  } finally {
    loadingStore.setLoading(false);
  }
};

const handleEdit = (id: number) => {
  console.log('Edit todo:', id);
};

const handleDelete = async (id: number) => {
  try {
    await api.delete(`/todos/${id}`);
    await fetchTodos(); 
  } catch (err) {
    console.error('Failed to delete todo:', err);
    error.value = 'Erro ao excluir tarefa. Tente novamente.';
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

    <!--taskslist -->
    <template v-if="todos.length > 0">
      <TaskCardComponent
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @edit="handleEdit(todo.id)"
        @delete="handleDelete(todo.id)"
      />
    </template>

    <!-- <EmptyState 
      v-else
      title="Nenhuma tarefa encontrada"
      description="Comece criando sua primeira tarefa"
      icon="📝"
    /> -->
  </div>
</template>