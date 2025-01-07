import { Address } from "viem";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { AuthStore } from "./AuthStore.interface";

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
        isLoggedIn: false,
        eoaAddress: undefined,
        logIn: (eoaAddress: Address) => set({ eoaAddress, isLoggedIn: true }),
        logOut: () => set({ isLoggedIn: false, eoaAddress: undefined }),
      }),
      { name: "r2rwithdraw-auth" },
    ),
  ),
);
