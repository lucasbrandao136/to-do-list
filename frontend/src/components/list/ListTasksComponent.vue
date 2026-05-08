<script setup lang="ts">
import { ref, computed } from "vue";
import MiniTask from "@/components/todosComponents/MiniTask.vue";

interface Task {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  completed: boolean;
  list_id?: number | null;
}

interface TaskList {
  id: number;
  name: string;
  color?: string;
  todos: Task[];
}

const props = defineProps<{ list: TaskList }>();
const emit = defineEmits(["move-task", "delete", "task-updated"]);

const isDragOver = ref(false);

const progressPercentage = computed(() => {
  if (props.list.todos.length === 0) return 0;
  const done = props.list.todos.filter((t) => t.completed).length;
  return Math.round((done / props.list.todos.length) * 100);
});

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  isDragOver.value = true;
};

const handleDragLeave = (event: DragEvent) => {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
    isDragOver.value = false;
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
  const raw = event.dataTransfer?.getData("text/plain");
  if (!raw) return;
  try {
    const { taskId, sourceListId } = JSON.parse(raw);
    if (sourceListId === props.list.id) return;
    emit("move-task", taskId, sourceListId, props.list.id);
  } catch {}
};
</script>

<template>
  <div
    class="bg-white rounded-2xl border-2 transition-all duration-200"
    :class="isDragOver
      ? 'border-purple-500 shadow-purple-md bg-purple-50/50'
      : 'border-purple-100 shadow-purple-sm'"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Header -->
    <div class="px-5 pt-5 pb-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            v-if="list.color"
            class="w-3 h-3 rounded-full flex-shrink-0"
            :style="{ backgroundColor: list.color }"
          />
          <h3 class="font-bold text-gray-900 truncate">{{ list.name }}</h3>
          <span class="text-xs font-medium text-purple-500 bg-purple-100 px-2 py-0.5 rounded-full flex-shrink-0">
            {{ list.todos.length }}
          </span>
        </div>
        <button
          class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
          @click.stop="emit('delete', list.id)"
          aria-label="Excluir lista"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <!-- Progress bar -->
      <div>
        <div class="flex justify-between text-xs mb-1">
          <span class="text-purple-400">Progresso</span>
          <span class="text-purple-600 font-bold">{{ progressPercentage }}%</span>
        </div>
        <div class="w-full bg-purple-100 rounded-full h-1.5">
          <div
            class="bg-gradient-to-r from-purple-600 to-violet-500 h-1.5 rounded-full transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Tasks -->
    <div class="px-5 pb-5 space-y-2 min-h-20">
      <MiniTask
        v-for="task in list.todos"
        :key="task.id"
        :todo="task"
        :listId="list.id"
        @task-updated="emit('task-updated')"
      />

      <div
        v-if="list.todos.length === 0"
        class="flex flex-col items-center justify-center py-6 rounded-xl border border-dashed border-purple-200 text-center"
        :class="isDragOver ? 'border-purple-400 bg-purple-50' : ''"
      >
        <svg class="w-8 h-8 text-purple-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 4v16m8-8H4" />
        </svg>
        <p class="text-sm text-purple-300">Arraste tarefas aqui</p>
      </div>
    </div>
  </div>
</template>
