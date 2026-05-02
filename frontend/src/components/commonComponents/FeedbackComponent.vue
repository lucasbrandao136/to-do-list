<script setup lang="ts">
import { watch, ref } from "vue";
import { useFeedbackStore } from "@/stores/feedbackStore";

const feedbackStore = useFeedbackStore();

const showFeedback = ref(false);
const feedback = ref<Feedback | null>();

watch(
  () => feedbackStore.isFeedbackShown,
  (newValue) => {
    if (newValue) {
      showFeedback.value = true;
      feedback.value = feedbackStore.feedback;

      setTimeout(() => {
        feedbackStore.feedback = null;
        feedbackStore.isFeedbackShown = false;
      }, 4000);
    } else {
      showFeedback.value = false;
      feedback.value = null;
    }
  },
  { deep: true }
);

interface Feedback {
  title: string;
  message: string;
}

const isSuccess = (title: string) => title.toLowerCase() === "sucesso";
</script>

<template>
  <div class="fixed top-4 right-4 z-50 md:top-6 md:right-6 pointer-events-none">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-4 scale-95"
      enter-to-class="opacity-100 translate-x-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0 scale-100"
      leave-to-class="opacity-0 translate-x-4 scale-95"
    >
      <div
        v-if="showFeedback && feedback"
        class="pointer-events-auto min-w-[280px] max-w-[90vw] rounded-2xl shadow-purple-lg overflow-hidden"
        :class="
          isSuccess(feedback.title)
            ? 'bg-gradient-to-br from-purple-600 to-violet-600'
            : 'bg-gradient-to-br from-red-600 to-rose-700'
        "
      >
        <div class="p-4 flex items-start gap-3">
          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5">
            <div
              class="w-7 h-7 rounded-full flex items-center justify-center"
              :class="isSuccess(feedback.title) ? 'bg-white/20' : 'bg-white/20'"
            >
              <svg
                v-if="isSuccess(feedback.title)"
                class="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <svg
                v-else
                class="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="font-bold text-white text-sm">{{ feedback.title }}</p>
            <p class="text-white/80 text-xs mt-0.5">{{ feedback.message }}</p>
          </div>

          <!-- Close -->
          <button
            class="flex-shrink-0 text-white/60 hover:text-white transition-colors p-0.5"
            @click="feedbackStore.isFeedbackShown = false"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Progress bar (auto-dismiss timer) -->
        <div class="h-0.5 bg-white/20">
          <div class="h-full bg-white/50 rounded-full animate-shrink" />
        </div>
      </div>
    </Transition>
  </div>
</template>
