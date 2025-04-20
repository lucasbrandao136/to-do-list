import { defineStore } from "pinia";

interface User {
  id: number;
  email: string;
  displayName: string;
  birthday: string;
  photoUrl: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    login(userData: User, token: string) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    },
    logout() {
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromLocalStorage() {
      const user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
    },
  },
});
