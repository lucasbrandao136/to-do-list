<script setup lang="ts">
interface Props {
  strength: number;
}

const props = defineProps<Props>();

const strengthLabels = [
  "Muito fraca",
  "Fraca",
  "Média",
  "Boa",
  "Forte",
];

const strengthColors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-green-500",
];
</script>

<template>
  <div class="mt-2">
    <div class="flex space-x-1">
      <div
        v-for="i in 4"
        :key="i"
        class="h-1 flex-1 rounded transition-colors duration-300"
        :class="{
          [strengthColors[strength - 1]]: i <= strength,
          'bg-gray-200': i > strength,
        }"
      />
    </div>
    <p class="mt-1 text-xs text-gray-500">
      {{ strengthLabels[strength] }}
    </p>
  </div>
</template>