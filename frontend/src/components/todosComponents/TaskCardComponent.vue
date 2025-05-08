<script setup lang="ts">
import { computed } from 'vue';
import Button from '@/components/ui/Button.vue';

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(['edit', 'delete']);

const formattedDate = computed(() => {
  return new Date(props.todo.dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
});

const statusColor = computed(() => {
  return props.todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
});
</script>

<template>
  <article class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
    <div class="p-5">
      <header class="flex justify-between items-start gap-3 mb-3">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-800 truncate">
            {{ todo.title }}
          </h3>
        </div>
        
        <div class="flex gap-2">
          <Button
            variant="text"
            size="sm"
            @click="emit('edit')"
            aria-label="Editar tarefa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          
          <Button
            variant="text"
            size="sm"
            @click="emit('delete')"
            aria-label="Excluir tarefa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </header>

      <p v-if="todo.description" class="text-gray-600 mb-4 line-clamp-2">
        {{ todo.description }}
      </p>

      <footer class="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
        <div class="flex items-center gap-2 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-gray-500">Prazo: {{ formattedDate }}</span>
        </div>

        <span 
          :class="['px-2 py-1 rounded-full text-xs font-medium', statusColor]"
        >
          {{ todo.completed ? 'Concluída' : 'Pendente' }}
        </span>
      </footer>
    </div>
  </article>
</template>