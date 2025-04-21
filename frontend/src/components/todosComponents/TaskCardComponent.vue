<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  dueDate: string;
}>();

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition mb-2">
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-xl font-bold text-gray-800">{{ title }}</h3>
      <div class="flex gap-2">
        <button
          @click="$emit('edit')"
          class="text-indigo-600 hover:text-indigo-800"
        >
          <i class="fas fa-pen"></i>
        </button>
        <button
          @click="$emit('delete')"
          class="text-red-500 hover:text-red-700"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>

    <p class="text-gray-600 mb-4">{{ description }}</p>

    <div class="text-sm text-gray-500">
      <i class="fas fa-calendar-alt mr-1"></i>
      Prazo: {{ dueDate }}
    </div>
  </div>
</template>
