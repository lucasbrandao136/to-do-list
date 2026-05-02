<script setup lang="ts">
import { computed } from "vue";

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

const emit = defineEmits(["edit", "delete", "toggle-complete"]);

const formattedDate = computed(() => {
  return new Date(props.todo.dueDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});

const statusClass = computed(() => {
  return props.todo.completed
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";
});
</script>

<template>
  <article
    class="relative group bg-white rounded-2xl shadow-purple-sm border border-purple-100/60 overflow-hidden transition-all duration-300 hover:shadow-purple-md hover:-translate-y-1 hover:border-purple-200 animate-fade-up"
  >
    <!-- Left accent bar -->
    <div
      class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />

    <div class="p-5">
      <header class="flex justify-between items-start gap-3 mb-3">
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <!-- Checkbox -->
          <button
            @click="emit('toggle-complete')"
            class="mt-0.5 flex-shrink-0 focus:outline-none"
            aria-label="Alternar conclusão"
          >
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
              :class="
                todo.completed
                  ? 'bg-gradient-to-br from-purple-600 to-violet-500 border-transparent shadow-[0_0_8px_rgba(124,58,237,0.4)]'
                  : 'border-purple-300 bg-purple-50 hover:border-purple-500'
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
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </button>

          <h3
            class="text-base font-bold leading-snug"
            :class="
              todo.completed
                ? 'text-gray-400 line-through font-normal'
                : 'text-gray-900'
            "
          >
            {{ todo.title }}
          </h3>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-1 flex-shrink-0">
          <button
            @click="emit('edit')"
            class="p-1.5 rounded-lg hover:bg-purple-50 transition-colors group/btn"
            aria-label="Editar tarefa"
          >
            <svg
              class="h-4 w-4 text-gray-400 group-hover/btn:text-purple-600 transition-colors"
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
            @click="emit('delete')"
            class="p-1.5 rounded-lg hover:bg-red-50 transition-colors group/btn"
            aria-label="Excluir tarefa"
          >
            <svg
              class="h-4 w-4 text-gray-400 group-hover/btn:text-red-500 transition-colors"
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
      </header>

      <p
        v-if="todo.description"
        class="text-gray-500 text-sm mb-4 line-clamp-2 pl-8"
      >
        {{ todo.description }}
      </p>

      <footer
        class="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-purple-50"
      >
        <div class="flex items-center gap-1.5 text-xs text-gray-400">
          <svg
            class="h-3.5 w-3.5 text-purple-300"
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

        <span
          :class="[
            'px-2.5 py-1 rounded-full text-xs font-semibold',
            statusClass,
          ]"
        >
          {{ todo.completed ? "Concluída" : "Pendente" }}
        </span>
      </footer>
    </div>
  </article>
</template>
