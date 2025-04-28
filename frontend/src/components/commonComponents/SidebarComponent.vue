<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(["closeSidebar"]);
const router = useRouter();

const links = [
  { name: "Home", path: "/home", icon: "🏠" },
  { name: "Tarefas", path: "/todos", icon: "✅" },
  { name: "Listas", path: "/lists", icon: "📋" },
  { name: "Sair", path: "/login", icon: "🚪", isLogout: true },
];

function navigate(link: { path: string; isLogout?: boolean }) {
  if (link.isLogout) {
    logout();
  }
  router.push(link.path);
  emit("closeSidebar");
}

function logout() {
  const auth = useAuthStore();
  auth.logout();
  router.push("/login");
}
</script>

<template>
  <div
    :class="[
      'bg-white border-r shadow-md fixed md:static md:translate-x-0 top-0 left-0 h-full w-64 z-40 transition-transform',
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <nav class="p-4 space-y-4">
      <button
        v-for="link in links"
        :key="link.path"
        @click="navigate(link)"
        :class="[
          'flex items-center space-x-3 w-full text-left p-2 rounded-lg transition',
          link.isLogout
            ? 'hover:bg-red-100 text-red-600'
            : 'hover:bg-gray-100 text-gray-700',
        ]"
      >
        <span class="text-2xl">{{ link.icon }}</span>
        <span>{{ link.name }}</span>
      </button>
    </nav>
  </div>
</template>
