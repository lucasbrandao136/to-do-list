<script setup lang="ts">
import { computed } from "vue";
import { api } from "@/services/api";
import { useFeedbackStore } from "@/stores/feedbackStore";

interface Task {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  completed: boolean;
  list_id?: number | null;
}

const props = defineProps<{
  todo: Task;
  listId: number | null;
}>();

const emit = defineEmits(["task-updated"]);
const feedbackStore = useFeedbackStore();

const formattedDate = computed(() => {
  const raw = props.todo.due_date;
  if (!raw) return "";
  return new Date(raw).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
});

const isOverdue = computed(() => {
  if (!props.todo.due_date || props.todo.completed) return false;
  return new Date(props.todo.due_date) < new Date();
});

const handleDragStart = (event: DragEvent) => {
  if (!event.dataTransfer) return;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ taskId: props.todo.id, sourceListId: props.listId })
  );
};

const handleToggleComplete = async () => {
  try {
    await api.patch(`/todo/${props.todo.id}/toggle`);
    emit("task-updated");
  } catch {
    feedbackStore.showFeedback("Erro", "Não foi possível atualizar a tarefa.");
  }
};
</script>

<template>
  <div
    class="group flex items-start gap-3 p-3 bg-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-purple-sm transition-all duration-200 cursor-grab active:cursor-grabbing active:opacity-60 active:scale-95"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <!-- Checkbox -->
    <button
      class="mt-0.5 flex-shrink-0"
      @click.stop="handleToggleComplete"
      :aria-label="todo.completed ? 'Marcar como pendente' : 'Marcar como concluída'"
    >
      <div
        class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
        :class="todo.completed ? 'bg-purple-600 border-purple-600' : 'border-purple-300 hover:border-purple-500'"
      >
        <svg v-if="todo.completed" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </button>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p
        class="text-sm font-medium leading-snug truncate"
        :class="todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'"
      >
        {{ todo.title }}
      </p>
      <div v-if="formattedDate" class="flex items-center gap-1 mt-1">
        <svg class="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          :class="isOverdue ? 'text-red-400' : 'text-purple-400'">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-xs" :class="isOverdue ? 'text-red-400 font-medium' : 'text-purple-400'">
          {{ formattedDate }}
        </span>
      </div>
    </div>

    <!-- Drag handle indicator -->
    <div class="opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0 mt-1">
      <svg class="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
        <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
        <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
      </svg>
    </div>
  </div>
</template>
