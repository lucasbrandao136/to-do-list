// loading.ts
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(value: boolean): void {

      if (value) this.loading = value;

      else {
        setTimeout(() => {
          this.loading = value;
        }, 300);
      }

    },
  },
});
