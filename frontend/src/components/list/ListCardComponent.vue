<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

interface TaskList {
  id: number;
  name: string;
  todos: Task[];
  color?: string;
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

const emit = defineEmits(["select", "delete"]);

const completedTasks = computed(() => {
  return props.list.todos.filter((task) => task.completed).length;
});

const progressPercentage = computed(() => {
  if (props.list.todos.length === 0) return 0;
  return Math.round((completedTasks.value / props.list.todos.length) * 100);
});

const barWidth = ref("0%");
onMounted(() => {
  setTimeout(() => {
    barWidth.value = `${progressPercentage.value}%`;
  }, 150);
});
</script>

<template>
  <article
    :class="[
      'bg-white rounded-2xl shadow-purple-sm border p-5 transition-all duration-300 cursor-pointer animate-fade-up',
      isActive
        ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-purple-md'
        : 'border-purple-100 hover:border-purple-300 hover:shadow-purple-md hover:-translate-y-0.5',
    ]"
    @click="emit('select', list)"
  >
    <header class="flex justify-between items-start mb-3">
      <div class="flex items-center gap-2 min-w-0">
        <div
          v-if="list.color"
          class="w-3 h-3 rounded-full flex-shrink-0"
          :style="{ backgroundColor: list.color }"
        />
        <h3 class="font-bold text-gray-900 truncate">
          {{ list.name }}
        </h3>
      </div>
      <button
        class="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all ml-2 flex-shrink-0"
        @click.stop="emit('delete', list.id)"
        aria-label="Excluir lista"
      >
        <svg
          class="h-4 w-4"
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
    </header>

    <div>
      <div class="flex justify-between text-xs font-medium mb-1.5">
        <span class="text-purple-500">Progresso</span>
        <span class="text-purple-600 font-bold">{{ progressPercentage }}%</span>
      </div>
      <div class="w-full bg-purple-100 rounded-full h-2">
        <div
          class="bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400 h-2 rounded-full transition-all duration-700 ease-out"
          :style="{ width: barWidth }"
        />
      </div>
      <div class="text-xs text-purple-400 mt-1.5 font-medium">
        {{ completedTasks }} de {{ list.todos.length }} tarefas concluídas
      </div>
    </div>
  </article>
</template>
