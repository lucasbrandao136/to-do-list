<script setup lang="ts">
//  Vue Functions
import { computed, toRefs, watch, ref } from "vue";
import { useRoute } from "vue-router";

// Components
import Load from "../components/commonComponents/Load.vue";

// Views
import HomeView from "./todoViews/HomeView.vue";
import TasksView from "./todoViews/TasksView.vue";

// Stores
// import { useLoadingStore } from '../stores/loading'

// const loadingStore = useLoadingStore()
const route = useRoute();

// const { setLoading } = useLoadingStore()

const currentPath = ref(window.location.pathname);

// Router
const routes: any = {
  0: HomeView,
  1: TasksView,
};

watch(
  () => route.params,
  async (): Promise<void> => {
    currentPath.value = window.location.pathname + window.location.hash;
  }
);

const currentView = computed(() => {
  const _path = currentPath.value.split("/")[1];
  switch (_path) {
    case "home":
      return routes[0];
    case "":
      return routes[0];
      case "tasks":
      return routes[1];
    default:
      return routes[0];
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <component :is="currentView" />
  </div>
  <!-- <Load v-if="loading" /> -->
</template>
