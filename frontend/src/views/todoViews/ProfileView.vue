<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const photoUrl = computed(() => authStore.user?.photoUrl || null);

interface Profile {
  id: number;
  email: string;
  fullName: string;
  displayName: string;
  birthday: string;
  registeredAt: string;
}

const profile = ref<Profile | null>(null);
const isLoading = ref(true);

const initial = computed(() => {
  return profile.value?.displayName?.charAt(0)?.toUpperCase() || "?";
});

const formattedBirthday = computed(() => {
  if (!profile.value?.birthday) return "";
  return new Date(profile.value.birthday).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});

const formattedRegisteredAt = computed(() => {
  if (!profile.value?.registeredAt) return "";
  return new Date(profile.value.registeredAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});

const fetchProfile = async () => {
  try {
    isLoading.value = true;
    const response = await api.get("/profile");
    profile.value = response;
  } catch (err) {
    if (authStore.user) {
      profile.value = {
        id: authStore.user.id,
        email: authStore.user.email,
        fullName: "",
        displayName: authStore.user.displayName,
        birthday: authStore.user.birthday,
        registeredAt: "",
      };
    }
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <div class="max-w-2xl mx-auto animate-fade-up">
    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-16">
      <div
        class="animate-spin rounded-full h-10 w-10 border-2 border-purple-200 border-t-purple-600"
      />
    </div>

    <div
      v-else-if="profile"
      class="bg-white rounded-2xl shadow-purple-lg border border-purple-100/60 overflow-hidden"
    >
      <!-- Header band -->
      <div
        class="relative px-6 py-10 text-center overflow-hidden"
        style="
          background: linear-gradient(
            135deg,
            #5b21b6 0%,
            #6d28d9 40%,
            #7c3aed 70%,
            #4c1d95 100%
          );
        "
      >
        <!-- Blobs decorativos -->
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"
        />
        <div
          class="absolute bottom-0 left-0 w-24 h-24 bg-purple-900/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"
        />

        <div class="relative z-10">
          <div
            class="w-20 h-20 rounded-full mx-auto border-2 border-white/30 shadow-purple-glow overflow-hidden"
          >
            <img
              v-if="photoUrl"
              :src="photoUrl"
              :alt="profile.displayName"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <span class="text-3xl font-bold text-white">{{ initial }}</span>
            </div>
          </div>
          <h1 class="text-xl font-bold text-white mt-4">
            {{ profile.displayName }}
          </h1>
          <p class="text-purple-200 text-sm mt-0.5">{{ profile.email }}</p>
        </div>
      </div>

      <!-- Info -->
      <div class="p-6 space-y-1">
        <div
          v-if="profile.fullName"
          class="flex justify-between items-start gap-6 py-3.5 border-b border-purple-50"
        >
          <span class="text-purple-400 text-sm font-medium shrink-0">Nome completo</span>
          <span class="text-gray-800 font-semibold text-sm text-right break-all">{{
            profile.fullName
          }}</span>
        </div>

        <div
          class="flex justify-between items-start gap-6 py-3.5 border-b border-purple-50"
        >
          <span class="text-purple-400 text-sm font-medium shrink-0">Email</span>
          <span class="text-gray-800 font-semibold text-sm text-right break-all">{{
            profile.email
          }}</span>
        </div>

        <div
          v-if="profile.birthday"
          class="flex justify-between items-start gap-6 py-3.5 border-b border-purple-50"
        >
          <span class="text-purple-400 text-sm font-medium shrink-0">Data de nascimento</span>
          <span class="text-gray-800 font-semibold text-sm text-right">{{
            formattedBirthday
          }}</span>
        </div>

        <div
          v-if="profile.registeredAt"
          class="flex justify-between items-start gap-6 py-3.5 border-b border-purple-50"
        >
          <span class="text-purple-400 text-sm font-medium shrink-0">Membro desde</span>
          <span class="text-gray-800 font-semibold text-sm text-right">{{
            formattedRegisteredAt
          }}</span>
        </div>

        <div class="pt-5">
          <button
            class="w-full inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-red-600 bg-white border border-red-200 shadow-sm transition-all duration-200 hover:border-red-400 hover:bg-red-50 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            @click="handleLogout"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
