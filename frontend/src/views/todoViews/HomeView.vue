<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import TaskModalComponent from "@/components/todosComponents/TaskModalComponent.vue";
import ListModalComponent from "@/components/list/ListModalComponent.vue";
import { useFeedbackStore } from "@/stores/feedbackStore";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const feedbackStore = useFeedbackStore();
const authStore = useAuthStore();

const isTaskModalOpen = ref(false);
const isListModalOpen = ref(false);

const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
});

const firstName = computed(() => {
  return authStore.user?.displayName?.split(" ")[0] || "";
});

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
  <div class="max-w-4xl mx-auto">
    <header class="mb-5">
      <h1 class="text-3xl font-extrabold text-gray-900">
        {{ greeting }}<span v-if="firstName">, {{ firstName }}</span
        >! 👋
      </h1>
      <p class="text-purple-500 mt-1.5 font-medium">
        O que vamos organizar hoje?
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <!-- Nova Tarefa -->
      <article
        class="group p-6 bg-white rounded-2xl shadow-purple-sm hover:shadow-purple-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-purple-100/60 hover:border-purple-200"
        @click="isTaskModalOpen = true"
        role="button"
        aria-label="Criar nova tarefa"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-3 bg-gradient-to-br from-purple-600 to-violet-500 rounded-xl text-white shadow-purple-sm group-hover:shadow-purple-md transition-all duration-200 group-hover:scale-105"
          >
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
            <h2 class="text-lg font-bold text-gray-900">Nova Tarefa</h2>
            <p class="text-purple-400 text-sm mt-0.5">
              Adicione uma tarefa rápida
            </p>
          </div>
        </div>
      </article>

      <!-- Nova Lista -->
      <article
        class="group p-6 bg-white rounded-2xl shadow-purple-sm hover:shadow-purple-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-purple-100/60 hover:border-purple-200"
        @click="isListModalOpen = true"
        role="button"
        aria-label="Criar nova lista"
      >
        <div class="flex items-center gap-4">
          <div
            class="p-3 bg-gradient-to-br from-violet-500 to-purple-400 rounded-xl text-white shadow-purple-sm group-hover:shadow-purple-md transition-all duration-200 group-hover:scale-105"
          >
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
            <h2 class="text-lg font-bold text-gray-900">Nova Lista</h2>
            <p class="text-purple-400 text-sm mt-0.5">
              Organize suas tarefas em listas
            </p>
          </div>
        </div>
      </article>
    </div>

    <!-- Quick nav cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
      <router-link
        to="/todos"
        class="group p-5 bg-white rounded-2xl shadow-purple-sm hover:shadow-purple-md hover:-translate-y-0.5 transition-all duration-300 border border-purple-100/60 hover:border-purple-200 flex items-center gap-3"
      >
        <div
          class="p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-100 transition-colors"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-gray-800 text-sm">Ver minhas tarefas</p>
          <p class="text-xs text-purple-400">Todas as tarefas</p>
        </div>
        <svg
          class="h-4 w-4 text-purple-300 ml-auto group-hover:text-purple-500 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </router-link>

      <router-link
        to="/lists"
        class="group p-5 bg-white rounded-2xl shadow-purple-sm hover:shadow-purple-md hover:-translate-y-0.5 transition-all duration-300 border border-purple-100/60 hover:border-purple-200 flex items-center gap-3"
      >
        <div
          class="p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-100 transition-colors"
        >
          <svg
            class="h-5 w-5"
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
          <p class="font-semibold text-gray-800 text-sm">Ver minhas listas</p>
          <p class="text-xs text-purple-400">Listas organizadas</p>
        </div>
        <svg
          class="h-4 w-4 text-purple-300 ml-auto group-hover:text-purple-500 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </router-link>
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
