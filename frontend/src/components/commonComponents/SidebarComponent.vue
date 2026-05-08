<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(["closeSidebar"]);
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
];

const navigate = (item: NavItem) => {
  if (item.isLogout) {
    authStore.logout();
  }
  router.push(item.path);
  emit("closeSidebar");
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
  emit("closeSidebar");
};

const icons: Record<string, string> = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  "check-circle": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  list: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  logout:
    "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
};
</script>

<template>
  <aside
    :class="[
      'bg-white border-r border-purple-100 fixed md:static md:translate-x-0 top-0 left-0 h-full w-64 z-40',
      'transition-transform duration-300 flex flex-col sidebar-scroll overflow-y-auto',
      open ? 'translate-x-0 shadow-purple-lg' : '-translate-x-full md:shadow-none',
    ]"
  >
    <!-- Nav -->
    <nav class="flex-1 p-4 space-y-1">
      <button
        v-for="item in navItems"
        :key="item.path"
        @click="navigate(item)"
        :class="[
          'nav-item-light w-full',
          router.currentRoute.value.path === item.path ? 'active' : '',
        ]"
      >
        <svg
          class="w-5 h-5 flex-shrink-0"
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
        <span>{{ item.name }}</span>
      </button>
    </nav>

    <!-- Bottom: user strip + logout -->
    <div class="flex-shrink-0 border-t border-purple-100">
      <!-- Logout -->
      <div class="px-4 pt-3">
        <button @click="handleLogout" class="nav-item-logout w-full">
          <svg
            class="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="icons['logout']"
            />
          </svg>
          <span>Sair</span>
        </button>
      </div>

      <!-- User strip -->
      <div class="p-4">
        <router-link
          to="/profile"
          @click="emit('closeSidebar')"
          class="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
        >
          <div class="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden">
            <img
              v-if="authStore.user?.photoUrl"
              :src="authStore.user.photoUrl"
              :alt="authStore.user.displayName"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white"
            >
              {{ authStore.user?.displayName?.charAt(0)?.toUpperCase() || "?" }}
            </div>
          </div>
          <div class="min-w-0">
            <p class="text-gray-800 text-sm font-medium truncate group-hover:text-purple-700 transition-colors">
              {{ authStore.user?.displayName || "Usuário" }}
            </p>
            <p class="text-purple-400 text-xs truncate">Meu perfil</p>
          </div>
        </router-link>
      </div>
    </div>
  </aside>
</template>
