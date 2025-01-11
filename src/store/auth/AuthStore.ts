import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { AuthStore } from "./AuthStore.interface";

// Only demostration code of how to use Zustand with persist and devtools
export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
        isLoggedIn: false,
        logIn: () => set({ isLoggedIn: true }),
        logOut: () => set({ isLoggedIn: false }),
      }),
      { name: "pino-withdraw-auth" },
    ),
  ),
);
