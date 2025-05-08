<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { useLoadingStore } from '@/stores/loadingStore';
import ListCardComponent from '@/components/listsComponents/ListCardComponent.vue';
import EmptyState from '@/components/ui/EmptyState.vue';

interface TaskList {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const loadingStore = useLoadingStore();
const lists = ref<TaskList[]>([]);
const error = ref<string | null>(null);
const selectedList = ref<TaskList | null>(null);

const fetchLists = async (): Promise<void> => {
  try {
    loadingStore.setLoading(true);
    error.value = null;
    const response = await api.get('/lists');
    lists.value = response.data || response;
  } catch (err: any) {
    console.error('Failed to fetch lists:', err);
    error.value = err.response?.data?.message || 'Erro ao carregar listas. Tente novamente.';
  } finally {
    loadingStore.setLoading(false);
  }
};

const handleSelectList = (list: TaskList) => {
  selectedList.value = list;
};

const handleDeleteList = async (id: number) => {
  try {
    await api.delete(`/lists/${id}`);
    if (selectedList.value?.id === id) {
      selectedList.value = null;
    }
    await fetchLists();
  } catch (err) {
    console.error('Failed to delete list:', err);
    error.value = 'Erro ao excluir lista. Tente novamente.';
  }
};

onMounted(() => {
  fetchLists();
});
</script>

<template>
  <div class="lists-view">
    <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="lg:col-span-1">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Minhas Listas</h2>
          <button 
            class="text-purple-600 hover:text-purple-800 font-medium"
            @click="selectedList = null"
          >
            Criar Nova
          </button>
        </div>


        <div class="space-y-3">
          <ListCardComponent
            v-for="list in lists"
            :key="list.id"
            :list="list"
            :is-active="selectedList?.id === list.id"
            @select="handleSelectList"
            @delete="handleDeleteList"
          />
        </div>

        <!-- Estado vazio -->
        <!-- <EmptyState 
          v-if="lists.length === 0 && !loadingStore.loading"
          title="Nenhuma lista encontrada"
          description="Comece criando sua primeira lista"
          icon="📋"
        /> -->
      </div>

      <div class="lg:col-span-2">
        <template v-if="selectedList">
          <ListTasksComponent 
            :list="selectedList"
            @refresh="fetchLists"
          />
        </template>
        
        <template v-else>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Selecione ou crie uma lista</h3>
            <p class="text-gray-600">Escolha uma lista ao lado para visualizar suas tarefas ou crie uma nova.</p>
          </div>
        </template>
      </div>
    </div>

    <ListModalComponent
      v-if="!selectedList"
      :list="null"
      @save="fetchLists"
      @close="selectedList = null"
    />
  </div>
</template>

<style scoped>
.lists-view {
  @apply p-6 max-w-7xl mx-auto;
}
</style>