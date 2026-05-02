<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  loading: false,
  disabled: false,
  type: "button",
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
      size === 'sm' && 'button-sm',
      size === 'lg' && 'button-lg',
      (disabled || loading) &&
        'opacity-50 cursor-not-allowed !transform-none !shadow-none',
    ]"
  >
    <span v-if="loading" class="flex items-center justify-center gap-2">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
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
  @apply inline-flex items-center justify-center rounded-xl px-5 py-2.5
         text-sm font-semibold transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
         active:scale-95;
}

.button-sm {
  @apply px-3 py-1.5 text-xs rounded-lg;
}

.button-lg {
  @apply px-6 py-3 text-base rounded-xl;
}

.button-primary {
  @apply text-white
         bg-gradient-to-r from-purple-600 to-violet-500
         shadow-[0_1px_3px_0_rgba(124,58,237,0.25)]
         hover:from-purple-700 hover:to-violet-600
         hover:shadow-[0_4px_16px_-2px_rgba(124,58,237,0.3)]
         hover:-translate-y-0.5;
}

.button-secondary {
  @apply text-purple-700 bg-white
         border border-purple-200
         shadow-[0_1px_3px_0_rgba(124,58,237,0.08)]
         hover:border-purple-400 hover:bg-purple-50
         hover:-translate-y-0.5
         hover:shadow-[0_4px_16px_-2px_rgba(124,58,237,0.15)];
}

.button-text {
  @apply text-purple-600 hover:text-purple-800
         hover:underline underline-offset-2
         px-0 py-0 rounded-none shadow-none active:scale-100;
}
</style>
