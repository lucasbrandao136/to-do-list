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
      }, 5000);
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
</script>

<template>
  <div class="fixed top-4 right-4 z-50 md:top-6 md:right-6">
    <div
      v-if="showFeedback && feedback"
      class="min-w-[300px] max-w-[90vw] p-4 rounded-lg shadow-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white flex flex-col gap-2 text-sm transition-all duration-300 transform hover:scale-[1.02]"
    >
      <div class="flex items-start justify-between">
        <div class="flex flex-col gap-1">
          <strong class="font-bold text-purple-100">{{
            feedback.title
          }}</strong>
          <span class="text-purple-50">{{ feedback.message }}</span>
        </div>
        <button
          class="text-purple-200 hover:text-white transition-colors p-1 -mt-1 -mr-1"
          @click="feedbackStore.isFeedbackShown = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
    </div>
  </div>
</template>
