<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'text';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false,
  type: 'button',
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="button"
    :class="[
      variant === 'primary' && 'button-primary',
      variant === 'secondary' && 'button-secondary',
      variant === 'text' && 'button-text',
      (disabled || loading) && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <span v-if="loading" class="flex items-center justify-center">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processando...
    </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<style scoped>
.button {
  @apply inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2;
}

.button-primary {
  @apply bg-purple-600 text-white hover:bg-purple-700;
}

.button-secondary {
  @apply border border-gray-300 bg-white text-gray-700 hover:bg-gray-50;
}

.button-text {
  @apply text-purple-600 hover:text-purple-700 hover:underline;
}
</style>