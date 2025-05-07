<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
    <div class="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md">
      <h2 class="text-center text-3xl font-bold text-purple-700">
        {{ title }}
      </h2>
      <slot />
    </div>
  </div>
</template>