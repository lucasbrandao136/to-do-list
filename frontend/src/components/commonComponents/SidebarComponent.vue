<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(['closeSidebar']);
const router = useRouter();
const authStore = useAuthStore();

interface NavItem {
  name: string;
  path: string;
  icon: string;
  isLogout?: boolean;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/home", icon: "home" },
  { name: "Tarefas", path: "/todos", icon: "check-circle" },
  { name: "Listas", path: "/lists", icon: "list" },
  { name: "Sair", path: "/login", icon: "logout", isLogout: true },
];

const navigate = (item: NavItem) => {
  if (item.isLogout) {
    authStore.logout();
  }
  router.push(item.path);
  emit('closeSidebar');
};


const icons: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  list: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
};
</script>

<template>
  <aside
    :class="[
      'bg-white border-r border-gray-100 fixed md:static md:translate-x-0 top-0 left-0 h-full w-64 z-40 transition-transform duration-300 shadow-sm md:shadow-none',
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="p-6 border-b border-gray-100">
      <router-link to="/home" class="flex items-center gap-2">
        <span class="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          TaskFlow
        </span>
      </router-link>
    </div>

    <nav class="p-4 space-y-1">
      <button
        v-for="item in navItems"
        :key="item.path"
        @click="navigate(item)"
        :class="[
          'flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors',
          item.isLogout
            ? 'text-red-600 hover:bg-red-50'
            : 'text-gray-700 hover:bg-gray-50',
          router.currentRoute.value.path === item.path && !item.isLogout 
            ? 'bg-purple-50 text-purple-600' 
            : ''
        ]"
      >
        <svg 
          class="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            :d="icons[item.icon]"
          />
        </svg>
        <span class="font-medium">{{ item.name }}</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.aside-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden;
}
</style>