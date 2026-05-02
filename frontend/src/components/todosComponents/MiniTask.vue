<script setup lang="ts">
import { computed } from "vue";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  listId?: number | null;
}

const props = defineProps<{
  todo: Task;
}>();

const emit = defineEmits(["edit", "delete", "toggle-complete", "drag-start"]);

const formattedDate = computed(() => {
  if (!props.todo.dueDate) return "";
  return new Date(props.todo.dueDate).toLocaleDateString();
});

const handleToggleComplete = () => {
  emit("toggle-complete");
};

const handleDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
  }
  emit("drag-start", props.todo);
};
</script>

<template>
  <div
    class="task-card bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-300 transition-all"
    :class="{ 'opacity-70': todo.completed }"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div class="flex items-start justify-between">
      <div class="flex items-start space-x-3">
        <button
          @click.stop="handleToggleComplete"
          class="mt-1 flex-shrink-0"
          aria-label="Alternar conclusão"
        >
          <div
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
            :class="
              todo.completed
                ? 'bg-purple-600 border-purple-600'
                : 'border-purple-400'
            "
          >
            <svg
              v-if="todo.completed"
              class="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </button>

        <div class="flex-1">
          <h3
            class="font-medium text-gray-800"
            :class="{ 'line-through text-gray-500': todo.completed }"
          >
            {{ todo.title }}
          </h3>
          <p
            v-if="todo.description"
            class="text-sm text-gray-600 mt-1"
            :class="{ 'line-through': todo.completed }"
          >
            {{ todo.description }}
          </p>
          <div
            v-if="todo.dueDate"
            class="mt-2 text-xs flex items-center"
            :class="todo.completed ? 'text-gray-400' : 'text-purple-600'"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ formattedDate }}
          </div>
        </div>
      </div>

      <div class="flex space-x-2">
        <button
          @click.stop="emit('edit', todo)"
          class="text-gray-400 hover:text-purple-600"
          aria-label="Editar tarefa"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          @click.stop="emit('delete', todo.id)"
          class="text-gray-400 hover:text-red-500"
          aria-label="Excluir tarefa"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  @apply cursor-grab active:cursor-grabbing;
}
</style>
