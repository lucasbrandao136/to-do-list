<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import TaskModalComponent from "@/components/todosComponents/TaskModalComponent.vue";
import ListModalComponent from "@/components/list/ListModalComponent.vue";

import { useFeedbackStore } from "@/stores/feedbackStore";

const router = useRouter();
const feedbackStore = useFeedbackStore();

const isTaskModalOpen = ref(false);
const isListModalOpen = ref(false);

const handleSaveTask = () => {
  feedbackStore.showFeedback("Sucesso", "Nova Tarefa Criada!");

  isTaskModalOpen.value = false;
};

const handleSaveList = () => {
  feedbackStore.showFeedback("Sucesso", "Nova Lista Criada!");

  isListModalOpen.value = false;
};
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Bem-vindo de volta! 👋</h1>
      <p class="text-gray-600 mt-2">O que vamos organizar hoje?</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
        @click="isTaskModalOpen = true"
        role="button"
        aria-label="Criar nova tarefa"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-purple-100 rounded-lg text-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Nova Tarefa</h2>
            <p class="text-gray-500">Adicione uma nova tarefa rápida</p>
          </div>
        </div>
      </article>

      <article
        class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
        @click="isListModalOpen = true"
        role="button"
        aria-label="Criar nova lista"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-100 rounded-lg text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Nova Lista</h2>
            <p class="text-gray-500">Organize suas tarefas em listas</p>
          </div>
        </div>
      </article>
    </div>

    <TaskModalComponent
      :open="isTaskModalOpen"
      mode="create"
      @save="handleSaveTask"
      @close="isTaskModalOpen = false"
    />

    <ListModalComponent
      :open="isListModalOpen"
      mode="create"
      @save="handleSaveList"
      @close="isListModalOpen = false"
    />
  </div>
</template>
