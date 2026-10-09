import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    async login(userData) {
      this.isLoggedIn = true;
      this.user = userData;
    },
    async logout() {
      const { clear } = useUserSession();
      try {
        await $fetch("/api/auth/log-out");
        await clear();
        this.isLoggedIn = false;
        this.user = null;
        await navigateTo("/auth/sign-up");
      } catch (err) {
        console.log(err);
      }
    },
  },
});
