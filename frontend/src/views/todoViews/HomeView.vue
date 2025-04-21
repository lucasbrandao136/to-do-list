<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

import TaskModalComponent from "@/components/todosComponents/TaskModalComponent.vue";

const isTaskModalOpen = ref(false);
const isListModalOpen = ref(false);

const handleSaveTask = (task: any) => {
  console.log("Tarefa salva:", task);
  isTaskModalOpen.value = false;
};
const handleSaveList = (list: any) => {
  console.log("Lista salva:", list);
  isListModalOpen.value = false;
};

function createTask() {
  isTaskModalOpen.value = true;
  console.log("Criar nova tarefa");
}
function createList() {
  console.log("Criar nova lista");
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-8">Bem-vindo de volta! 👋</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
        @click="createTask()"
      >
        <h2 class="text-xl font-semibold mb-2">Criar Nova Tarefa</h2>
        <p class="text-gray-500">Adicione uma nova tarefa rápida.</p>
      </div>

      <div
        class="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
        @click="createList()"
      >
        <h2 class="text-xl font-semibold mb-2">Criar Nova Lista</h2>
        <p class="text-gray-500">Organize suas tarefas em listas.</p>
      </div>
    </div>


    <TaskModalComponent
      :open="isTaskModalOpen"
      mode="create"
      @save="handleSaveTask"
      @close="isTaskModalOpen = false"
    />
  </div>
</template>
