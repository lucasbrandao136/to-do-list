<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { api } from "@/services/api";
import { useLoadingStore } from "@/stores/loadingStore";
import { useFeedbackStore } from "@/stores/feedbackStore";
import ListCardComponent from "@/components/list/ListCardComponent.vue";
import ListTasksComponent from "@/components/list/ListTasksComponent.vue";
import ListModalComponent from "@/components/list/ListModalComponent.vue";

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
  color?: string;
}

const loadingStore = useLoadingStore();
const feedbackStore = useFeedbackStore();
const lists = ref<TaskList[]>([]);
const error = ref<string | null>(null);
const selectedList = ref<TaskList | null>(null);
const draggedTask = ref<{ task: Task; originalListId: number | null } | null>(
  null
);

const showModal = ref(false);
const modalMode = ref<"create" | "edit">("create");
const modalInitialData = ref<Partial<TaskList> | undefined>(undefined);

const unassignedTasksList = computed(() => ({
  id: null,
  name: "Tarefas sem lista",
  todos: lists.value.flatMap((list) =>
    list.todos.filter(
      (task) => task.listId === null || task.listId === undefined
    )
  ),
}));

const allLists = computed(() => [unassignedTasksList.value, ...lists.value]);

const fetchLists = async () => {
  try {
    loadingStore.setLoading(true);
    error.value = null;
    const response = await api.get("/lists");
    lists.value = response;

    if (selectedList.value && selectedList.value.id) {
      const updated = lists.value.find((l) => l.id === selectedList.value!.id);
      if (updated) selectedList.value = updated;
    }
  } catch (err: any) {
    error.value = err.message || "Erro ao carregar listas. Tente novamente.";
  } finally {
    loadingStore.setLoading(false);
  }
};

const handleSelectList = (list: TaskList) => {
  selectedList.value = list;
};

const handleDeleteList = async (id: number) => {
  try {
    await api.delete(`/list/${id}`);
    if (selectedList.value?.id === id) selectedList.value = null;
    feedbackStore.showFeedback("Sucesso", "Lista excluída!");
    await fetchLists();
  } catch (err) {
    error.value = "Erro ao excluir lista. Tente novamente.";
  }
};

const handleDragStart = (task: Task, listId: number | null) => {
  draggedTask.value = { task, originalListId: listId };
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = async (targetListId: number | null) => {
  if (!draggedTask.value) return;
  const { task, originalListId } = draggedTask.value;
  if (originalListId === targetListId) {
    draggedTask.value = null;
    return;
  }

  try {
    if (targetListId !== null) {
      await api.patch(`/todo/${task.id}/associate`, { listId: targetListId });
    } else {
      await api.patch(`/todo/${task.id}/disassociate`);
    }
    draggedTask.value = null;
    await fetchLists();
  } catch (err) {
    error.value = "Erro ao mover tarefa. Tente novamente.";
    draggedTask.value = null;
  }
};

const handleTaskUpdated = () => {
  fetchLists();
};

const openCreateModal = () => {
  modalMode.value = "create";
  modalInitialData.value = undefined;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
const onListSaved = () => {
  closeModal();
  fetchLists();
};

onMounted(() => {
  fetchLists();
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div
      v-if="error"
      class="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6"
    >
      {{ error }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Lista sidebar -->
      <div class="lg:col-span-1">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-900">Minhas Listas</h2>
          <button
            class="btn-primary text-xs px-3 py-1.5"
            style="border-radius: 10px"
            @click="openCreateModal"
          >
            + Criar Nova
          </button>
        </div>

        <div class="space-y-3">
          <!-- Tarefas sem lista -->
          <div
            class="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:border-purple-400"
            :class="
              selectedList?.id === null
                ? 'border-purple-500 shadow-purple-sm'
                : 'border-purple-200'
            "
            @click="selectedList = unassignedTasksList"
          >
            <h3 class="font-semibold text-purple-700">Tarefas sem lista</h3>
            <p class="text-sm text-purple-400 mt-0.5">
              {{ unassignedTasksList.todos.length }} tarefas
            </p>
          </div>

          <ListCardComponent
            v-for="list in lists"
            :key="list.id"
            :list="list"
            :is-active="selectedList?.id === list.id"
            @select="handleSelectList"
            @delete="handleDeleteList"
          />
        </div>
      </div>

      <!-- Conteúdo da lista -->
      <div class="lg:col-span-2">
        <template v-if="selectedList">
          <ListTasksComponent
            :list="selectedList"
            @refresh="fetchLists"
            @drag-start="handleDragStart"
            @drop="handleDrop(selectedList.id)"
            @drag-over="handleDragOver"
            @task-updated="handleTaskUpdated"
          />
        </template>

        <template v-else>
          <div
            class="bg-white rounded-2xl shadow-purple-sm border border-purple-100/60 p-10 flex flex-col items-center justify-center min-h-[360px]"
          >
            <div class="text-center max-w-sm">
              <div
                class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-5"
              >
                <svg
                  class="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                Selecione uma lista
              </h3>
              <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                Escolha uma lista ao lado para ver suas tarefas, ou crie uma
                nova lista para começar.
              </p>
              <button class="btn-primary" @click="openCreateModal">
                Criar Nova Lista
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <ListModalComponent
      :open="showModal"
      :mode="modalMode"
      :initial-data="modalInitialData"
      @save="onListSaved"
      @close="closeModal"
    />
  </div>
</template>
