<script setup lang="ts">
import { computed } from 'vue';

interface TaskList {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const props = defineProps<{
  list: TaskList;
  isActive: boolean;
}>();

const emit = defineEmits(['select', 'delete']);

const completedTasks = computed(() => {
  return props.list.tasks.filter(task => task.completed).length;
});

const progressPercentage = computed(() => {
  if (props.list.tasks.length === 0) return 0;
  return Math.round((completedTasks.value / props.list.tasks.length) * 100);
});
</script>

<template>
  <article
    :class="[
      'bg-white rounded-xl shadow-sm border p-4 transition-all cursor-pointer',
      isActive 
        ? 'border-purple-500 ring-1 ring-purple-500' 
        : 'border-gray-100 hover:border-purple-300'
    ]"
    @click="emit('select', list)"
  >
    <header class="flex justify-between items-start mb-2">
      <h3 class="font-semibold text-gray-800 truncate">
        {{ list.title }}
      </h3>
      <button
        class="text-gray-400 hover:text-red-500 ml-2"
        @click.stop="emit('delete', list.id)"
        aria-label="Excluir lista"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </header>

    <p v-if="list.description" class="text-gray-600 text-sm mb-3 line-clamp-2">
      {{ list.description }}
    </p>

    <div class="mt-2">
      <div class="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progresso</span>
        <span>{{ progressPercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-purple-600 h-2 rounded-full" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      <div class="text-xs text-gray-500 mt-1">
        {{ completedTasks }} de {{ list.tasks.length }} tarefas concluídas
      </div>
    </div>
  </article>
</template>