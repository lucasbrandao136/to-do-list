<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["toggleSidebar"]);
</script>

<template>
  <header class="bg-white shadow-md p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <button class="md:hidden" @click="emit('toggleSidebar')">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <span class="text-xl font-bold">Seu App</span>
    </div>

    <div class="flex items-center space-x-4">
      <a href="/profile">👤</a>
    </div>
  </header>
</template>
