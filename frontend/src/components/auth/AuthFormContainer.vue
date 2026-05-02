<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- LEFT: Brand panel (md+) -->
    <div
      class="hidden md:flex md:w-5/12 lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12"
      style="
        background: linear-gradient(
          160deg,
          #1e1b4b 0%,
          #4c1d95 40%,
          #6d28d9 100%
        );
      "
    >
      <!-- Decorative blobs -->
      <div
        class="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"
      />
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"
      />
      <div
        class="absolute top-1/2 left-1/2 w-48 h-48 bg-violet-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none"
      />

      <!-- Content -->
      <div class="relative z-10 text-center max-w-xs">
        <!-- Logo icon -->
        <div
          class="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-purple-glow"
        >
          <svg
            class="w-8 h-8 text-purple-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 class="text-4xl font-bold text-white mb-3 tracking-tight">
          TaskFlow
        </h1>
        <p class="text-purple-200 text-base leading-relaxed">
          Organize suas tarefas com elegância e produtividade.
        </p>

        <!-- Feature bullets -->
        <div class="mt-10 space-y-4 text-left">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-4 h-4 text-purple-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span class="text-purple-100 text-sm"
              >Listas e tarefas organizadas</span
            >
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-4 h-4 text-purple-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span class="text-purple-100 text-sm">Rápido e fácil de usar</span>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-4 h-4 text-purple-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span class="text-purple-100 text-sm">Acompanhe seu progresso</span>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: Form panel -->
    <div
      class="flex-1 md:w-7/12 lg:w-1/2 flex flex-col items-center justify-center bg-purple-50 px-6 py-12 md:px-10 lg:px-16 min-h-screen md:min-h-0"
    >
      <!-- Mobile logo -->
      <div class="md:hidden mb-8 text-center">
        <div class="flex items-center gap-2 justify-center mb-2">
          <div
            class="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-500 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span
            class="text-2xl font-bold bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent"
          >
            TaskFlow
          </span>
        </div>
      </div>

      <div class="w-full max-w-md animate-fade-up">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
          <p v-if="subtitle" class="text-gray-500 text-sm mt-1">
            {{ subtitle }}
          </p>
        </div>

        <div
          class="bg-white rounded-2xl shadow-purple-md p-8 space-y-5 border border-purple-100/60"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
