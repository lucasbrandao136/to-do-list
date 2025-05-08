<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/services/api';
import TaskCardComponent from '@/components/todosComponents/TaskCardComponent.vue';
import EmptyState from '@/components/ui/EmptyState.vue';

const props = defineProps<{
  list: {
    id: number;
    title: string;
    tasks: Array<{
      id: number;
      title: string;
      description: string;
      dueDate: string;
      completed: boolean;
    }>;
  };
}>();

const emit = defineEmits(['refresh']);

const handleTaskUpdated = () => {
  emit('refresh');
};

const handleAddTask = () => {
};
</script>

<template>
  <div class="list-tasks-container">
    <header class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ list.title }}
      </h2>
      <button
        class="text-purple-600 hover:text-purple-800 font-medium"
        @click="handleAddTask"
      >
        Adicionar Tarefa
      </button>
    </header>

    <div class="space-y-3">
      <TaskCardComponent
        v-for="task in list.tasks"
        :key="task.id"
        :todo="task"
        @edit="handleTaskUpdated"
        @delete="handleTaskUpdated"
      />
    </div>

    <EmptyState 
      v-if="list.tasks.length === 0"
      title="Nenhuma tarefa nesta lista"
      description="Adicione sua primeira tarefa"
      icon="📝"
    />
  </div>
</template>

<style scoped>
.list-tasks-container {
  @apply bg-white rounded-xl shadow-sm p-6 border border-gray-100;
}
</style>