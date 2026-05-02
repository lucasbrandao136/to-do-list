<script setup lang="ts">
import { computed } from "vue";
import MiniTask from "@/components/todosComponents/MiniTask.vue";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  listId?: number | null;
}

interface TaskList {
  id: number;
  name: string;
  todos: Task[];
}

const props = defineProps<{
  list: TaskList;
}>();

const emit = defineEmits(["drag-start", "drop", "drag-over", "task-updated"]);

const handleDragStart = (task: Task) => {
  emit("drag-start", task, props.list.id);
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  emit("drop", props.list.id);
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  emit("drag-over", event);
};

const progressPercentage = computed(() => {
  if (props.list.todos.length === 0) return 0;
  const completed = props.list.todos.filter((t) => t.completed).length;
  return Math.round((completed / props.list.todos.length) * 100);
});
</script>

<template>
  <div
    class="list-container bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    @drop="handleDrop"
    @dragover="handleDragOver"
  >
    <header class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-purple-700">
        {{ list.name }}
      </h2>
      <span
        class="text-sm text-purple-500 bg-purple-100 px-2 py-1 rounded-full"
      >
        {{ list.todos.length }} tarefas
      </span>
    </header>

    <!-- Barra de progresso -->
    <div class="mb-4">
      <div class="flex justify-between text-xs text-purple-700 mb-1">
        <span>Progresso</span>
        <span>{{ progressPercentage }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-purple-600 h-2 rounded-full"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>

    <!-- Area de drop -->
    <div
      class="tasks-area min-h-40"
      :class="{
        'border-2 border-dashed border-purple-300 rounded-lg p-2':
          list.todos.length === 0,
      }"
    >
      <MiniTask
        v-for="task in list.todos"
        :key="task.id"
        :todo="task"
        draggable="true"
        @dragstart="handleDragStart(task)"
        @edit="emit('task-updated')"
        @delete="emit('task-updated')"
        @toggle-complete="emit('task-updated')"
      />

      <div
        v-if="list.todos.length === 0"
        class="text-center py-8 text-gray-400"
      >
        <p class="font-medium">
          {{
            list.id ? "Nenhuma tarefa nesta lista" : "Nenhuma tarefa sem lista"
          }}
        </p>
        <p class="text-sm mt-1">
          {{
            list.id
              ? "Arraste tarefas para ca ou adicione novas"
              : "Todas as tarefas estao em listas"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  @apply transition-all hover:shadow-md;
}

.tasks-area {
  @apply space-y-3;
}
</style>
