import { defineStore } from "pinia";

import { ref } from "vue";

interface Feedback {
  title: string;
  message: string;
}

export const useFeedbackStore = defineStore("feedback", () => {
  const feedback = ref<Feedback | null>(null);
  const isFeedbackShown = ref(false);

  const showFeedback = (title: string, message: string) => {
    feedback.value = { title, message };
    isFeedbackShown.value = true;
  };

  return {
    feedback,
    isFeedbackShown,
    showFeedback,
  };
});
