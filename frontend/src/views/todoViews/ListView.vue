<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { api } from "@/services/api";
import { useLoadingStore } from "@/stores/loadingStore";
import { useFeedbackStore } from "@/stores/feedbackStore";
import ListTasksComponent from "@/components/list/ListTasksComponent.vue";
import ListModalComponent from "@/components/list/ListModalComponent.vue";
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

const loadingStore = useLoadingStore();
const feedbackStore = useFeedbackStore();

const lists = ref<TaskList[]>([]);
const allTodos = ref<Task[]>([]);
const error = ref<string | null>(null);
const isDragOverUnassigned = ref(false);

const showModal = ref(false);
const modalMode = ref<"create" | "edit">("create");
const modalInitialData = ref<Partial<TaskList> | undefined>(undefined);

const unassignedTodos = computed(() =>
  allTodos.value.filter((t) => t.list_id === null || t.list_id === undefined)
);

const totalTasks = computed(() => allTodos.value.length);

const fetchAll = async () => {
  try {
    loadingStore.setLoading(true);
    error.value = null;
    const [listsRes, todosRes] = await Promise.all([
      api.get("/lists"),
      api.get("/todos"),
    ]);
    lists.value = listsRes;
    allTodos.value = todosRes;
  } catch (err: any) {
    error.value = err.message || "Erro ao carregar dados.";
  } finally {
    loadingStore.setLoading(false);
  }
};

const moveTask = async (
  taskId: number,
  sourceListId: number | null,
  targetListId: number | null
) => {
  if (sourceListId === targetListId) return;
  try {
    if (targetListId !== null) {
      await api.patch(`/todo/${taskId}/associate`, { listId: targetListId });
    } else {
      await api.patch(`/todo/${taskId}/disassociate`);
    }
    await fetchAll();
  } catch {
    error.value = "Erro ao mover tarefa. Tente novamente.";
  }
};

const handleDropUnassigned = (event: DragEvent) => {
  event.preventDefault();
  isDragOverUnassigned.value = false;
  const raw = event.dataTransfer?.getData("text/plain");
  if (!raw) return;
  try {
    const { taskId, sourceListId } = JSON.parse(raw);
    if (sourceListId === null) return;
    moveTask(taskId, sourceListId, null);
  } catch {}
};

const handleDragOverUnassigned = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  isDragOverUnassigned.value = true;
};

const handleDragLeaveUnassigned = (event: DragEvent) => {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
    isDragOverUnassigned.value = false;
  }
};

const handleDeleteList = async (id: number) => {
  try {
    await api.delete(`/list/${id}`);
    feedbackStore.showFeedback("Sucesso", "Lista excluída!");
    await fetchAll();
  } catch {
    error.value = "Erro ao excluir lista.";
  }
};

const openCreateModal = () => {
  modalMode.value = "create";
  modalInitialData.value = undefined;
  showModal.value = true;
};

const onListSaved = () => {
  showModal.value = false;
  fetchAll();
};

onMounted(fetchAll);
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900">Minhas Listas</h1>
        <p class="text-purple-400 text-sm mt-0.5">
          {{ lists.length }} lista{{ lists.length !== 1 ? 's' : '' }} · {{ totalTasks }} tarefa{{ totalTasks !== 1 ? 's' : '' }}
        </p>
      </div>
      <button class="btn-primary" @click="openCreateModal">+ Nova Lista</button>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
      {{ error }}
    </div>

    <!-- Hint -->
    <div class="flex items-center gap-2 text-xs text-purple-400 bg-purple-50 rounded-xl px-4 py-2.5 border border-purple-100">
      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Arraste tarefas entre as listas ou para "Sem lista"</span>
    </div>

    <!-- Two-panel layout -->
    <div class="flex flex-col lg:flex-row gap-5 items-start">

      <!-- LEFT: Unassigned tasks -->
      <div class="w-full lg:w-72 xl:w-80 flex-shrink-0">
        <div
          class="rounded-2xl border-2 border-dashed transition-all duration-200 min-h-48"
          :class="isDragOverUnassigned
            ? 'border-purple-500 bg-purple-50 shadow-purple-md'
            : 'border-purple-200 bg-white'"
          @dragover="handleDragOverUnassigned"
          @dragleave="handleDragLeaveUnassigned"
          @drop="handleDropUnassigned"
        >
          <!-- Panel header -->
          <div class="px-5 pt-5 pb-3">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-violet-400 flex-shrink-0" />
              <h2 class="font-bold text-gray-900 text-sm">Sem lista</h2>
              <span class="text-xs font-medium text-purple-500 bg-purple-100 px-2 py-0.5 rounded-full">
                {{ unassignedTodos.length }}
              </span>
            </div>
            <p class="text-xs text-purple-400">Tarefas não organizadas</p>
          </div>

          <!-- Tasks -->
          <div class="px-5 pb-5 space-y-2">
            <MiniTask
              v-for="todo in unassignedTodos"
              :key="todo.id"
              :todo="todo"
              :listId="null"
              @task-updated="fetchAll"
            />

            <div
              v-if="unassignedTodos.length === 0"
              class="flex flex-col items-center justify-center py-8 text-center"
            >
              <svg class="w-10 h-10 text-purple-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-purple-300 font-medium">Tudo organizado!</p>
              <p class="text-xs text-purple-200 mt-0.5">Arraste aqui para remover de uma lista</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Lists -->
      <div class="flex-1 min-w-0">
        <!-- Lists grid: 1 col on mobile/tablet, 2 cols on xl -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ListTasksComponent
            v-for="list in lists"
            :key="list.id"
            :list="list"
            @move-task="moveTask"
            @delete="handleDeleteList(list.id)"
            @task-updated="fetchAll"
          />

          <!-- Create new list card -->
          <button
            class="rounded-2xl border-2 border-dashed border-purple-200 p-8 flex flex-col items-center justify-center gap-2 text-purple-400 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 min-h-40"
            @click="openCreateModal"
          >
            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span class="text-sm font-medium">Nova Lista</span>
          </button>
        </div>

        <!-- Empty state (no lists at all) -->
        <div
          v-if="lists.length === 0"
          class="bg-white rounded-2xl shadow-purple-sm border border-purple-100/60 p-10 flex flex-col items-center justify-center text-center"
        >
          <div class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-5">
            <svg class="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Nenhuma lista ainda</h3>
          <p class="text-gray-500 text-sm mb-6">Crie uma lista para organizar suas tarefas</p>
          <button class="btn-primary" @click="openCreateModal">+ Criar Primeira Lista</button>
        </div>
      </div>
    </div>

    <ListModalComponent
      :open="showModal"
      :mode="modalMode"
      :initial-data="modalInitialData"
      @save="onListSaved"
      @close="showModal = false"
    />
  </div>
</template>
